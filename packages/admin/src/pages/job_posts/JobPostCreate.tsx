import { Row, Col, Card, Form, Button } from 'react-bootstrap'
import { PageTitle, FormInput, FormSelect } from 'components'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Suspense } from 'react'
import useJobPostCreateForm, { JobPostCreateFormData } from './hooks/useJobPostCreateForm'
import {
    careerTypeOptions,
    educationTypeOptions,
    jobPostProcessOptions,
    jobPostTerminatedReasonOptions,
} from 'appConstants/options'
import { Controller } from 'react-hook-form'
import CustomDatepicker from 'components/form/CustomDatepicker'
import { useMutation, useQuery } from 'react-query'
import { createJobPost, jobPostDetail, updateJobPost } from 'api'
import JobCategorySelect from 'components/form/JobCategorySelect'
import CompanySearchInput from 'components/form/CompanySearchInput'
import { JobPostModel, JobPostStatus, PostJobPostsRequest, PutJobPostsDetailRequest } from '@recruit/interface'
import SkillSearchInput from 'components/form/SkillSearchInput'
import FormAddress from 'components/form/FormAddress'
import FormInputNumber from 'components/form/FormInputNumber'
import JobPostFile from 'components/job_post/JobPostFile'

const JobPostCreate = () => {
    const { id } = useParams()
    const { data } = useQuery(`job_posts/${id}`, () => jobPostDetail(Number(id)), {
        enabled: id !== 'new',
        suspense: true,
    })
    const navigate = useNavigate()

    const createMutation = useMutation(
        (data: PostJobPostsRequest) => {
            return createJobPost(data)
        },
        {
            onSuccess: (data) => {
                if (data.data) {
                    navigate({ pathname: '/job_posts' })
                } else {
                    console.error(data.error)
                    alert(data.error?.message)
                }
            },
        }
    )

    const updateMutation = useMutation(
        (data: PutJobPostsDetailRequest) => {
            return updateJobPost(Number(id), data)
        },
        {
            onSuccess: (data) => {
                if (data.data) {
                    navigate({ pathname: '/job_posts' })
                } else {
                    console.error(data.error)
                    alert(data.error?.message)
                }
            },
        }
    )

    const refinedInitData = (data: JobPostModel) => {
        return {
            ...data,
            depth1JobCategory: { value: data.depth1JobCategory.id, label: data.depth1JobCategory.name },
            depth2JobCategory: { value: data.depth2JobCategory.id, label: data.depth2JobCategory.name },
            depth3JobCategoryList: data.depth3JobCategoryList.map((data) => {
                return { value: data.id, label: data.name }
            }),
            terminatedReason: { value: data.terminatedReason, label: data.terminatedReason },
            careerType: { value: data.careerType, label: data.careerType },
            status: { value: data.status, label: data.status },
            startedAt: new Date(data.startedAt).valueOf(),
            endedAt: data.endedAt ? new Date(data.endedAt).valueOf() : null,
            company: { value: data.company.id, label: data.company.name_ko },
            skillList: data.skillList.map((skill) => {
                return { value: skill.id, label: skill.name, alias: skill.alias }
            }),
            process: data.process.map((process) => {
                return { value: process, label: process }
            }),
            minEducationType: { value: data.minEducationType, label: data.minEducationType },
            files: data.files,
        } as JobPostCreateFormData
    }

    const validate = (data: JobPostCreateFormData) => {
        if (!data.title) return false
        if (!data.linkUrl) return false
        if (!data.description) return false
        if (!data.process || data.process.length === 0) return false
        if (!data.startedAt) return false
        if (!data.careerPeriod) return false
        if (!data.depth1JobCategory || !data.depth2JobCategory || !data.depth3JobCategoryList || data.depth3JobCategoryList.length === 0) return false
        if (!data.company) return false
        return true
    }

    const refinedRequestData = (data: JobPostCreateFormData) => {

        return {
            ...data,
            depth1JobCategoryId: data.depth1JobCategory.value,
            depth2JobCategoryId: data.depth2JobCategory.value,
            depth3JobCategoryIdList: data.depth3JobCategoryList.map((category) => category.value),
            companyId: data.company.value,
            terminatedReason: data.terminatedReason.value,
            careerType: data.careerType.value,
            status: JobPostStatus.OPEN,
            skillIdList: data.skillList ? data.skillList.map((skill) => skill.value) : [],
            process: data.process.map((process) => process.value),
            minEducationType: data.minEducationType?.value,
            files: data.files.filter((file) => file.key).map((file) => {
                return { id: file.id ? file.id : undefined, name: file.name, key: file.key }
            }),
        } as PostJobPostsRequest
    }

    const { setValue, handleSubmit, register, control, errors } = useJobPostCreateForm(
        data?.data ? refinedInitData(data.data.item) : undefined
    )

    if (data && data.error) {
        console.error(data.error)
        return <Navigate to={'/error-500-alt'}></Navigate>
    }

    const formSubmit = (value: JobPostCreateFormData) => {
        if (!validate(value)) {
            alert('필수값을 입력해주세요')
            return false
        }
        const data = refinedRequestData(value)
        if (id === 'new') {
            createMutation.mutate(data)
        } else {
            updateMutation.mutate(data)
        }
    }

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: '채용공고 관리', path: '/job_posts' },
                    { label: '채용공고 등록', path: '/job_posts/new', active: true },
                ]}
                title={'채용공고 등록'}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <form onSubmit={handleSubmit(formSubmit)}>
                                        <Row>
                                            <Col xl={12}>
                                                <FormInput
                                                    required
                                                    name="title"
                                                    label="제목"
                                                    containerClass={'mb-3'}
                                                    register={register}
                                                    key="title"
                                                    errors={errors}
                                                    control={control}
                                                />

                                                <FormInput
                                                    required
                                                    name="linkUrl"
                                                    label="외부 채용공고 링크"
                                                    containerClass={'mb-3'}
                                                    register={register}
                                                    errors={errors}
                                                    control={control}
                                                />

                                                <FormInput
                                                    required
                                                    name="description"
                                                    label="상세 설명"
                                                    placeholder="상세 설명을 입력해주세요"
                                                    type="textarea"
                                                    style={{ height: 250 }}
                                                    rows="5"
                                                    containerClass={'mb-3'}
                                                    register={register}
                                                    key="description"
                                                    errors={errors}
                                                    control={control}
                                                />

                                                <FormSelect
                                                    required
                                                    name="careerType"
                                                    label="경력 타입"
                                                    containerClass={'mb-3'}
                                                    register={register}
                                                    isMulti={false}
                                                    errors={errors}
                                                    control={control}
                                                    options={careerTypeOptions}
                                                />

                                                <FormSelect
                                                    required
                                                    defaultSelect={jobPostTerminatedReasonOptions[0]}
                                                    name="terminatedReason"
                                                    label="채용 기간"
                                                    containerClass={'mb-3'}
                                                    register={register}
                                                    isMulti={false}
                                                    errors={errors}
                                                    control={control}
                                                    options={jobPostTerminatedReasonOptions}
                                                />
                                                <FormSelect
                                                    required
                                                    name="process"
                                                    label="채용 절차"
                                                    containerClass={'mb-3'}
                                                    register={register}
                                                    isMulti={true}
                                                    errors={errors}
                                                    control={control}
                                                    options={jobPostProcessOptions}
                                                />
                                                <Row>
                                                    <Col xl={6}>
                                                        <Form.Group className="mb-3 position-relative">
                                                            <Form.Label>시작일<span style={{ color: 'red' }}> *</span></Form.Label>
                                                            <Controller
                                                                name="startedAt"
                                                                control={control}
                                                                render={(field) => (
                                                                    <CustomDatepicker
                                                                        {...field}
                                                                        value={
                                                                            data?.data?.item.startedAt
                                                                                ? new Date(data?.data?.item.startedAt)
                                                                                : null
                                                                        }
                                                                        onChange={(date) =>
                                                                            setValue('startedAt', date.valueOf())
                                                                        }
                                                                        hideAddon={true}
                                                                        dateFormat="yyyy-MM-dd"
                                                                    />
                                                                )}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xl={6}>
                                                        <Form.Group className="mb-3 position-relative">
                                                            <Form.Label>종료일</Form.Label>
                                                            <Controller
                                                                name="endedAt"
                                                                control={control}
                                                                render={(field) => (
                                                                    <CustomDatepicker
                                                                        {...field}
                                                                        value={
                                                                            data?.data?.item.endedAt
                                                                                ? new Date(data?.data?.item.endedAt)
                                                                                : null
                                                                        }
                                                                        onChange={(date) =>
                                                                            setValue('endedAt', date.valueOf())
                                                                        }
                                                                        hideAddon={true}
                                                                        dateFormat="yyyy-MM-dd"
                                                                    />
                                                                )}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>

                                                <FormInputNumber
                                                    required
                                                    name="careerPeriod"
                                                    label="최소경력"
                                                    type="number"
                                                    containerClass={'mb-3'}
                                                    register={register}
                                                    errors={errors}
                                                    control={control}
                                                />
                                                <Suspense
                                                    fallback={
                                                        <Row style={{ minHeight: 91.594 }}>
                                                            <Col></Col>
                                                        </Row>
                                                    }
                                                >
                                                    <JobCategorySelect
                                                        required
                                                        containerClass="mb-3"
                                                        control={control}
                                                        errors={errors}
                                                        depth1Name="depth1JobCategory"
                                                        depth2Name="depth2JobCategory"
                                                        depth3Name="depth3JobCategoryList"
                                                    />
                                                </Suspense>
                                                <Form.Group className="mb-3 position-relative">
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
                                                <Form.Group className="mb-3 position-relative">
                                                    <Form.Label>관련 기술</Form.Label>
                                                    <SkillSearchInput
                                                        id="skillList"
                                                        name="skillList"
                                                        control={control}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Row>
                                                <Col xl={6}>
                                                    <FormSelect
                                                        label="최소학력"
                                                        name="minEducationType"
                                                        containerClass={'mb-3'}
                                                        isMulti={false}
                                                        control={control}
                                                        options={educationTypeOptions}
                                                    />
                                                </Col>
                                                <Col xl={6}>
                                                    <FormInput
                                                        name="charge"
                                                        label="담당"
                                                        containerClass={'mb-3'}
                                                        register={register}
                                                        errors={errors}
                                                        control={control}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xl={6}>
                                                    <FormInputNumber
                                                        name="minAge"
                                                        label="최소연령"
                                                        type="number"
                                                        containerClass={'mb-3'}
                                                        register={register}
                                                        errors={errors}
                                                        control={control}
                                                    />
                                                </Col>
                                                <Col xl={6}>
                                                    <FormInputNumber
                                                        name="maxAge"
                                                        label="최대연령"
                                                        type="number"
                                                        containerClass={'mb-3'}
                                                        register={register}
                                                        errors={errors}
                                                        control={control}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xl={6}>
                                                    <FormInputNumber
                                                        name="minAnnualIncome"
                                                        label="최소연봉"
                                                        type="number"
                                                        containerClass={'mb-3'}
                                                        register={register}
                                                        errors={errors}
                                                        control={control}
                                                    />
                                                </Col>
                                                <Col xl={6}>
                                                    <FormInputNumber
                                                        name="maxAnnualIncome"
                                                        label="최대연봉"
                                                        type="number"
                                                        containerClass={'mb-3'}
                                                        register={register}
                                                        errors={errors}
                                                        control={control}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xl={6}>
                                                    <FormAddress
                                                        name="workPlace"
                                                        label="근무지"
                                                        containerClass={'mb-3'}
                                                        register={register}
                                                        errors={errors}
                                                        control={control}
                                                    />
                                                </Col>
                                            </Row>
                                        </Row>

                                        <Row>
                                            <Col xl={6}>
                                                <Form.Label>첨부파일</Form.Label>
                                                <JobPostFile
                                                    register={register}
                                                    control={control}
                                                    errors={errors}
                                                    setValue={setValue}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="mt-2">
                                            <Col>
                                                <Button type="submit" variant="success">
                                                    저장
                                                </Button>
                                            </Col>
                                        </Row>
                                    </form>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default JobPostCreate
