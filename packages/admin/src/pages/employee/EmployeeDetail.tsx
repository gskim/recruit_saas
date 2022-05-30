import { Row, Col, Card, Button, Form } from 'react-bootstrap'
import { PageTitle, FormInput, Spinner } from 'components'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import useEmployeeDetailForm, { EmployeeDetailFormData } from './hooks/useEmployeeDetailForm'
import { useQuery, useMutation } from 'react-query'
import { modifyEmployee, createEmployee, deleteEmployee, getEmployee } from 'api'
import { Suspense, useEffect, useState } from 'react'
import { EmployeeModel, EmployeeStatus, PostEmployeesRequest, PutEmployeesDetailRequest } from '@recruit/interface'
import CompanySearchInput from 'components/form/CompanySearchInput'
import Loading from 'components/Loading'

const initFormData = (data: EmployeeModel) => {
    return {
        ...data,
        company: { label: data.company.name_ko, value: data.company.id}
    }
}

const EmployeeDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const modifiedEmployeeMutation = useMutation((formData: EmployeeDetailFormData) => {
        const data: PutEmployeesDetailRequest = {
            ...formData,
        }
        return modifyEmployee(Number(id!), data)
    })

    const createEmployeeMutation = useMutation((formData: EmployeeDetailFormData) => {
        const data: PostEmployeesRequest = {
            ...formData,
            company_id: formData.company.value,
        }
        return createEmployee(data)
    })

    const deleteBtnClick = async () => {
        if (id) {
            const { data } = await deleteEmployee(Number(id))
            if (data.data) {
                navigate({ pathname: '/employees' })
            } else {
                alert('실패하였습니다')
            }
        }
    }

    const handleValidSubmit = (value: EmployeeDetailFormData) => {
        if (id !== 'new') {
            modifiedEmployeeMutation.mutate(value, {
                onSuccess: (data) => {
                    if (data.data.data) {
                        alert('저장되었습니다')
                        navigate({ pathname: '/employees' })
                    } else {
                        console.error(data.data.error)
                        alert(data.data.error?.message)
                    }
                },
            })
        } else {
            const company = { ...value.company }
            if (!company) {
                alert('기업 입력은 필수입니다')
                return false
            }
            createEmployeeMutation.mutate(value, {
                onSuccess: (data) => {
                    if (data.data.data) {
                        alert('저장되었습니다')
                        navigate({ pathname: '/employees' })
                    } else {
                        console.error(data.data.error)
                        alert(data.data.error?.message)
                    }
                },
            })
        }
    }

    const { data } = useQuery(`employees/${id}`, () => getEmployee(Number(id)), {
        enabled: id !== 'new',
        suspense: true,
    })


    if (data && data.data.error) {
        alert(data.data.error.code + data.data.error.message)
        return <Navigate to={'/error-500-alt'}></Navigate>
    }

    const { handleSubmit, register, control, errors, setValue } = useEmployeeDetailForm(
        data?.data.data ? initFormData(data?.data.data.item) : undefined
    )

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: '외부직원 관리', path: '/employees' },
                    {
                        label: id && id !== 'new' ? id : '등록',
                        path: `/employees${id ? '/' + id : 'new'}`,
                        active: true,
                    },
                ]}
                title={id !== 'new' ? '외부직원 수정' : '외부직원 등록'}
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
                                                    <FormInput
                                                        name="name"
                                                        label="이름"
                                                        containerClass={'mb-3'}
                                                        register={register}
                                                        key="name"
                                                        errors={errors}
                                                        control={control}
                                                    />
                                                    <FormInput
                                                        name="email"
                                                        label="이메일"
                                                        containerClass={'mb-3'}
                                                        register={register}
                                                        key="email"
                                                        errors={errors}
                                                        control={control}
                                                    />
                                                    <FormInput
                                                        name="phone"
                                                        label="핸드폰번호"
                                                        containerClass={'mb-3'}
                                                        register={register}
                                                        key="phone"
                                                        errors={errors}
                                                        control={control}
                                                    />
                                                </Col>
                                                <Col xl={6}>
                                                    <Form.Group className="mb-3 mt-3 mt-xl-0">
                                                        <Form.Label>기업</Form.Label>
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
                                                </Col>
                                            </Row>

                                            <Row className="mt-2">
                                                <Col></Col>
                                                <Col>
                                                    <Button className="me-2" type="submit" variant="success">
                                                        저장
                                                    </Button>
                                                    {(id !== 'new' && data?.data.data?.item.status !== EmployeeStatus.CLOSE) && (
                                                        <Button variant="danger" onClick={() => deleteBtnClick()}>
                                                            삭제
                                                        </Button>
                                                    )}
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

export default EmployeeDetail
