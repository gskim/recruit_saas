import { Row, Col, Card, Form, Button, FormGroup } from 'react-bootstrap'
import { PageTitle, FormInput, FormSelect } from 'components'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { RecruitDetailFormData } from './hooks/useRecruitDetailForm'
import { recruitProcessOptions, recruitStatusOptions } from 'appConstants/options'
import { useQuery, useMutation } from 'react-query'
import { Suspense, useEffect } from 'react'
import { PostRecruitsRequest, PutRecruitsDetailRequest, RecruitModel } from '@recruit/interface'
import Loading from 'components/Loading'
import { createRecruit, getRecruit, updateRecruit } from 'api/recruit'
import ResumeSearchInput from 'components/form/ResumeSearchInput'
import JobPostSearchInput from 'components/form/JobPostSearchInput'
import useRecruitDetailForm from './hooks/useRecruitDetailForm'

const definedInitData = (data: RecruitModel) => {
    return {
        title: data.title,
        description: data.description,
        status: { value: data.status, label: data.status },
        process: { value: data.process, label: data.process },
        jobPost: { value: data.job_post.job_post_id, label: data.job_post.job_post_title },
        resume: { value: data.resume.resume_id, label: data.resume.resume_title },
    }
}

const validate = (data: RecruitDetailFormData) => {
    if (!data.title || !data.resume || !data.jobPost) {
        return false
    }
    return true
}

const RecruitDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const createMutation = useMutation((formData: RecruitDetailFormData) => {
        const data: PostRecruitsRequest = {
            title: formData.title,
            description: formData.description,
            resumeId: formData.resume.value,
            jobPostId: formData.jobPost.value,
        }
        return createRecruit(data)
    })

    const updateMutation = useMutation((formData: RecruitDetailFormData) => {
        const data: PutRecruitsDetailRequest = {
            description: formData.description,
            status: formData.status.value,
            process: formData.process.value
        }
        return updateRecruit(Number(id!!), data)
    })

    const handleValidSubmit = (value: RecruitDetailFormData) => {
        if (!validate(value)) {
            alert('필수값을 모두 채워주세요.')
            return false
        }
        if (id === 'new') {
            createMutation.mutate(value, {
                onSuccess: (data) => {
                    if (data.data?.recruit_id) {
                        alert('수정되었습니다')
                        navigate({ pathname: '/recruits' })
                    } else {
                        console.error(data.error)
                        alert(data.error?.message)
                    }
                },
            })
        } else {
            updateMutation.mutate(value, {
                onSuccess: (data) => {
                    if (data.data) {
                        alert('수정되었습니다')
                        navigate({ pathname: '/recruits' })
                    } else {
                        console.error(data.error)
                        alert(data.error?.message)
                    }
                },
            })
        }

    }

    const { data } = useQuery(`recruits/${id}`, () => getRecruit(Number(id)), {
        enabled: id !== 'new',
        suspense: true
    })

    const { handleSubmit, register, control, errors, setValue } = useRecruitDetailForm(
        data?.data ? definedInitData(data.data.item) : undefined
    )

    if (data?.error) {
        console.error(data.error)
        alert(data.error.message)
        return <Navigate to={'/error-500-alt'}></Navigate>
    }

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: '채용프로세스 목록', path: '/recruits' },
                    { label: id!, path: '/recruits' + id, active: true },
                ]}
                title={'채용프로세스 상세'}
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
                                                <FormSelect
                                                    disabled={id === 'new'}
                                                    required
                                                    defaultSelect={recruitStatusOptions[0]}
                                                    isMulti={false}
                                                    label="진행여부"
                                                    containerClass={'mb-3'}
                                                    name="status"
                                                    register={register}
                                                    control={control}
                                                    errors={errors}
                                                    options={recruitStatusOptions}
                                                />
                                                </Col>
                                                <Col xl={6}>
                                                <FormSelect
                                                    disabled={id === 'new'}
                                                    required
                                                    defaultSelect={recruitProcessOptions[0]}
                                                    isMulti={false}
                                                    label="진행상태"
                                                    containerClass={'mb-3'}
                                                    name="process"
                                                    register={register}
                                                    control={control}
                                                    errors={errors}
                                                    options={recruitProcessOptions}
                                                />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xl={6}>
                                                    <FormInput
                                                        required
                                                        disabled={id !== 'new'}
                                                        name="title"
                                                        label="제목"
                                                        containerClass={'mb-3'}
                                                        register={register}
                                                        key="title"
                                                        errors={errors}
                                                        control={control}
                                                    />
                                                    <Form.Group className="mb-3 position-relative">
                                                    <Form.Label>이력서<span style={{ color: 'red' }}> *</span></Form.Label>
                                                    <ResumeSearchInput
                                                        required
                                                        id="resume"
                                                        name="resume"
                                                        control={control}
                                                        disable={id !== 'new'}
                                                        onChange={(v) => {
                                                            if (v) {
                                                                setValue('resume', { label: v.label, value: v.value })
                                                            }
                                                        }}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3 position-relative">
                                                    <Form.Label>채용 공고<span style={{ color: 'red' }}> *</span></Form.Label>
                                                    <JobPostSearchInput
                                                        required
                                                        id="jobPost"
                                                        name="jobPost"
                                                        control={control}
                                                        disable={id !== 'new'}
                                                        onChange={(v) => {
                                                            if (v) {
                                                                setValue('jobPost', { label: v.label, value: v.value })
                                                            }
                                                        }}
                                                    />
                                                </Form.Group>

                                                </Col>
                                                <Col xl={6}>
                                                <FormInput
                                                        style={{height: 200}}
                                                        type={'textarea'}
                                                        name="description"
                                                        label="메모"
                                                        containerClass={'mb-3'}
                                                        register={register}
                                                        key="description"
                                                        errors={errors}
                                                        control={control}
                                                    />
                                                </Col>
                                            </Row>

                                            <Row className="mt-2">
                                                <Col></Col>
                                                <Col>
                                                    <Button type="submit" variant="success">
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

export default RecruitDetail
