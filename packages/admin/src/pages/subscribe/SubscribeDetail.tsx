import { Row, Col, Card, Button, Form } from 'react-bootstrap'
import { PageTitle, FormInput, Spinner } from 'components'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { SubscribeDetailFormData } from './hooks/useSubscribeDetailForm'
import { useQuery, useMutation } from 'react-query'
import { createSubscribe, modifySubscribe, getSubscribe } from 'api'
import { Suspense, useEffect, useState } from 'react'
import { PostSubscribesRequest, PutSubscribesRequest, SubscribeModel } from '@recruit/interface'
import { Controller } from 'react-hook-form'
import CompanySearchInput from 'components/form/CompanySearchInput'
import useSubscribeDetailForm from './hooks/useSubscribeDetailForm'
import CustomDatepicker from 'components/form/CustomDatepicker'
import SubscribePolicySelect from 'components/form/SubscribePolicySelect'
import Loading from 'components/Loading'

const initFormData = (data: SubscribeModel) => {
    return {
        ...data,
        company: { label: data.company.name_ko, value: data.company.id },
        subscribe_policy: {
            label: data.subscribe_policy.name,
            value: data.subscribe_policy.id,
        },
        started_at: new Date(data.started_at).valueOf(),
        ended_at: new Date(data.ended_at).valueOf(),
    }
}

const SubscribeDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const modifiedEmployeeMutation = useMutation(
        (formData: SubscribeDetailFormData) => {
            const data: PutSubscribesRequest = {
                ...formData,
                subscribe_policy_id: formData.subscribe_policy.value,
            }
            return modifySubscribe(Number(id!), data)
        },
        {
            onSuccess: (data) => {
                if (data.data.data) {
                    navigate({ pathname: '/subscribes' })
                } else {
                    alert('실패하였습니다')
                }
            },
        }
    )

    const createEmployeeMutation = useMutation(
        (formData: SubscribeDetailFormData) => {
            const data: PostSubscribesRequest = {
                ...formData,
                company_id: formData.company.value,
                subscribe_policy_id: formData.subscribe_policy.value,
            }
            return createSubscribe(data)
        },
        {
            onSuccess: (data) => {
                if (data.data.data) {
                    navigate({ pathname: '/subscribes' })
                } else {
                    alert('실패하였습니다')
                }
            },
        }
    )

    const validation = (data: SubscribeDetailFormData) => {
        if (!data.started_at || !data.ended_at || !data.company || !data.price || !data.subscribe_policy) {
            return false
        }
        return true
    }

    const handleValidSubmit = (value: SubscribeDetailFormData) => {
        if (!validation(value)) {
            alert('필수값을 모두 입력해주세요')
            return false
        }
        if (id !== 'new') {
            modifiedEmployeeMutation.mutate(value)
        } else {
            const company = { ...value.company }
            if (!company) {
                alert('기업 입력은 필수입니다')
                return false
            }
            createEmployeeMutation.mutate(value)
        }
    }


    const { data } = useQuery(`employees/${id}`, () => getSubscribe(Number(id)), {
        enabled: id !== 'new',
        suspense: true,
    })

    if (data && data.data.error) {
        alert(data.data.error.code + data.data.error.message)
        return <Navigate to={'/error-500-alt'}></Navigate>
    }

    const { handleSubmit, register, control, errors, setValue } = useSubscribeDetailForm(
        data?.data.data ? initFormData(data.data.data.item) : undefined
    )

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: '구독 관리', path: '/subscribes' },
                    {
                        label: id && id !== 'new' ? id : '등록',
                        path: `/subscribes${id ? '/' + id : 'new'}`,
                        active: true,
                    },
                ]}
                title={id !== 'new' ? '구독 수정' : '구독 등록'}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Suspense fallback={Loading}>
                            <Row>
                                <Col>
                                    <form onSubmit={handleSubmit(handleValidSubmit)}>
                                        <Row>
                                            <Col xl={6}>
                                                <Form.Group className="mb-3 mt-3 mt-xl-0">
                                                    <Form.Label>시작일<span style={{ color: 'red' }}> *</span></Form.Label>
                                                    <Controller
                                                        name="started_at"
                                                        control={control}
                                                        render={(field) => (
                                                            <CustomDatepicker
                                                                {...field}
                                                                value={
                                                                    data?.data.data?.item.started_at
                                                                        ? new Date(data?.data.data?.item.started_at)
                                                                        : null
                                                                }
                                                                onChange={(date) =>
                                                                    setValue('started_at', date.valueOf())
                                                                }
                                                                hideAddon={true}
                                                                dateFormat="yyyy-MM-dd"
                                                            />
                                                        )}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3 mt-3 mt-xl-0">
                                                    <Form.Label>종료일<span style={{ color: 'red' }}> *</span></Form.Label>
                                                    <Controller
                                                        name="ended_at"
                                                        control={control}
                                                        render={(field) => (
                                                            <CustomDatepicker
                                                                {...field}
                                                                value={
                                                                    data?.data.data?.item.ended_at
                                                                        ? new Date(data?.data.data?.item.ended_at)
                                                                        : null
                                                                }
                                                                onChange={(date) =>
                                                                    setValue('ended_at', date.valueOf())
                                                                }
                                                                hideAddon={true}
                                                                dateFormat="yyyy-MM-dd"
                                                            />
                                                        )}
                                                    />
                                                </Form.Group>

                                                <FormInput
                                                required
                                                    name="price"
                                                    label="금액"
                                                    type="number"
                                                    containerClass={'mb-3'}
                                                    register={register}
                                                    key="price"
                                                    errors={errors}
                                                    control={control}
                                                />
                                            </Col>
                                            <Col xl={6}>
                                                <Form.Group className="mb-3 mt-3 mt-xl-0">
                                                    <Form.Label>기업<span style={{ color: 'red' }}> *</span></Form.Label>
                                                    <CompanySearchInput
                                                        id="company"
                                                        name="company"
                                                        control={control}
                                                        disable={id !== 'new'}
                                                        onChange={(v) => {
                                                            if (v) {
                                                                setValue('company',
                                                                    { label: v.label, value: v.value },
                                                                )
                                                            }
                                                        }}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3 mt-3 mt-xl-0">
                                                    <Form.Label>구독 타입<span style={{ color: 'red' }}> *</span></Form.Label>
                                                    <SubscribePolicySelect name="subscribe_policy" control={control} />
                                                </Form.Group>
                                                <FormInput
                                                    name="memo"
                                                    label="메모"
                                                    type="textarea"
                                                    containerClass={'mb-3'}
                                                    register={register}
                                                    key="memo"
                                                    control={control}
                                                />
                                            </Col>
                                        </Row>

                                        <Row className="mt-2">
                                            <Col></Col>
                                            <Col>
                                                <Button className="me-2" type="submit" variant="success">
                                                    저장
                                                </Button>
                                            </Col>
                                        </Row>
                                    </form>
                                </Col>
                            </Row>
                            </Suspense>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default SubscribeDetail
