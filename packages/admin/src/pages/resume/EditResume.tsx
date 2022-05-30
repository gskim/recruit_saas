import {
    GetResumesDetailActivitiesResponse,
    GetResumesDetailAwardsResponse,
    GetResumesDetailCareersResponse,
    GetResumesDetailDescriptionsResponse,
    GetResumesDetailEducationsResponse,
    GetResumesDetailLanguageLevelsResponse,
    GetResumesDetailLanguageTestsResponse,
    GetResumesDetailLicensesResponse,
    GetResumesDetailLinksResponse,
    GetResumesDetailResponse,
} from '@recruit/interface'
import {
    getResume,
    getResumeActivities,
    getResumeAwards,
    getResumeCareers,
    getResumeDescriptions,
    getResumeEducations,
    getResumeLanguageLevels,
    getResumeLanguageTests,
    getResumeLicenses,
    getResumeLinks,
} from 'api'
import { PageTitle } from 'components'
import JobCategorySelect from 'components/form/JobCategorySelect'
import ActivityForm from 'components/resume/ActivityForm'
import AwardForm from 'components/resume/AwardForm'
import BasicForm from 'components/resume/BasicForm'
import CareerForm from 'components/resume/CareerForm'
import DescriptionForm from 'components/resume/DescriptionForm'
import EducationForm from 'components/resume/EducationForm'
import useResumeForm, { ResumeFormData } from 'components/resume/hooks/useResumeForm'
import LanguageLevelForm from 'components/resume/LanguageLevelForm'
import LanguageTestForm from 'components/resume/LanguageTestForm'
import LicenseForm from 'components/resume/LicenseForm'
import LinkForm from 'components/resume/LinkForm'
import { useToggle } from 'hooks'
import { Suspense } from 'react'
import { Button, Card, Col, Collapse, Row } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useMutationCreateResume from './hooks/useMutationCreateResume'
import useMutationDescriptionResume from './hooks/useMutationDescriptionResume'
import useMutationDetailResume from './hooks/useMutationDetailResume'
import useMutationUpdateResume from './hooks/useMutationUpdateResume'

const validation = (data: ResumeFormData) => {
    console.log(data)
    if (!data.name || data.name.trim() === '') {
        return false
    }
    if (!data.title || data.title.trim() === '') {
        return false
    }
    if (!data.email || data.email.trim() === '') {
        return false
    }
    if (data.birthday) {
        const birthArray = data.birthday.split('-')
        if (birthArray.length !== 3) {
            return false
        }
        if (birthArray[0].length !== 4 || birthArray[1].length !== 2 || birthArray[2].length !== 2) {
            return false
        }
    }
    if (!data.depth1JobCategory || !data.depth2JobCategory || !data.depth3JobCategoryList || data.depth3JobCategoryList.length === 0) {
        return false
    }
    if (data.careers.length) {
        for (const career of data.careers) {
            if (!career.company_name || !career.organization || !career.charge || !career.started_at) {
                return false
            }
            const tasks = career.tasks
            for (const task of tasks) {
                if (!task.title || !task.description) {
                    return false
                }
            }
        }
    }

    if (data.licenses.length) {
        for (const license of data.licenses) {
            if (!license.name || !license.applied_at || !license.organization) {
                return false
            }
        }
    }

    if (data.awards.length) {
        for (const award of data.awards) {
            if (!award.title || !award.description || !award.dated_at) {
                return false
            }
        }
    }

    if (data.activities.length) {
        for(const activity of data.activities) {
            if (!activity.title || !activity.description || !activity.started_at || !activity.ended_at) {
                return false
            }
        }
    }

    if (data.educations.length) {
        for (const education of data.educations) {
            if (!education.name || !education.started_at || !education.type || !education.status) {
                return false
            }
        }
    }

    return true
}

const initFormData = (
    resume: GetResumesDetailResponse,
    careers: GetResumesDetailCareersResponse,
    awards: GetResumesDetailAwardsResponse,
    activities: GetResumesDetailActivitiesResponse,
    educations: GetResumesDetailEducationsResponse,
    licenses: GetResumesDetailLicensesResponse,
    descriptions: GetResumesDetailDescriptionsResponse,
    links: GetResumesDetailLinksResponse,
    languageLevels: GetResumesDetailLanguageLevelsResponse,
    languageTests: GetResumesDetailLanguageTestsResponse
): ResumeFormData => {
    return {
        ...resume.item,
        gender: { label: resume.item.gender, value: resume.item.gender },
        depth1JobCategory: { value: resume.item.depth1JobCategory.id, label: resume.item.depth1JobCategory.name },
        depth2JobCategory: { value: resume.item.depth2JobCategory.id, label: resume.item.depth2JobCategory.name },
        depth3JobCategoryList: resume.item.depth3JobCategoryList.map((category) => {
            return {
                value: category.id,
                label: category.name,
            }
        }),
        skillList: resume.item.skillList.map((skill) => {
            return {
                value: skill.id,
                label: skill.name,
            }
        }),
        projects: [],
        careers: careers.item_list.map((career) => {
            return {
                ...career,
                started_at: new Date(career.started_at).valueOf(),
                ended_at: career.ended_at ? new Date(career.ended_at).valueOf() : null,
            }
        }),
        licenses: licenses.item_list.map((license) => {
            return {
                ...license,
                name: { value: license.license_id!!, label: license.name },
                applied_at: new Date(license.applied_at).valueOf(),
            }
        }),
        awards: awards.item_list.map((award) => {
            return {
                ...award,
                dated_at: new Date(award.dated_at).valueOf(),
            }
        }),
        activities: activities.item_list.map((activity) => {
            return {
                ...activity,
                started_at: new Date(activity.started_at).valueOf(),
                ended_at: new Date(activity.ended_at).valueOf(),
            }
        }),
        educations: educations.item_list.map((education) => {
            return {
                ...education,
                started_at: new Date(education.started_at).valueOf(),
                ended_at: education.ended_at ? new Date(education.ended_at).valueOf() : null,
                status: { label: education.status, value: education.status },
                type: { label: education.type, value: education.type },
                name: { label: education.name, value: education.target_id!! },
            }
        }),
        descriptions: descriptions.item_list.map((ds) => {
            return {
                ...ds,
            }
        }),
        links: links.item_list.map((link) => {
            return {
                ...link,
                type: { label: link.type, value: link.type },
            }
        }),
        language_tests: languageTests.item_list.map((lt) => {
            return {
                ...lt,
                type: { label: lt.type, value: lt.type },
                applied_at: new Date(lt.applied_at).valueOf(),
            }
        }),
        language_levels: languageLevels.item_list.map((ll) => {
            return {
                ...ll,
                type: { label: ll.type, value: ll.type },
                grade: { label: ll.grade, value: ll.grade },
            }
        }),
    }
}

const EditResume = () => {
    const { id } = useParams()
    const queryOption = {
        enabled: id !== 'new',
        suspense: true,
    }

    const { data: resume } = useQuery(`resumes/${id}`, () => getResume(Number(id)), queryOption)
    const { data: careers } = useQuery(`resumes/${id}/careers`, () => getResumeCareers(Number(id)), queryOption)
    const { data: awards } = useQuery(`resumes/${id}/awards`, () => getResumeAwards(Number(id)), queryOption)
    const { data: activities } = useQuery(
        `resumes/${id}/activities`,
        () => getResumeActivities(Number(id)),
        queryOption
    )
    const { data: educations } = useQuery(
        `resumes/${id}/educations`,
        () => getResumeEducations(Number(id)),
        queryOption
    )
    const { data: licenses } = useQuery(`resumes/${id}/licenses`, () => getResumeLicenses(Number(id)), queryOption)
    const { data: descriptions } = useQuery(
        `resumes/${id}/descriptions`,
        () => getResumeDescriptions(Number(id)),
        queryOption
    )
    const { data: links } = useQuery(`resumes/${id}/links`, () => getResumeLinks(Number(id)), queryOption)
    const { data: languageLevels } = useQuery(
        `resumes/${id}/language_levels`,
        () => getResumeLanguageLevels(Number(id)),
        queryOption
    )
    const { data: languageTests } = useQuery(
        `resumes/${id}/language_tests`,
        () => getResumeLanguageTests(Number(id)),
        queryOption
    )

    const { control, register, errors, setValue, handleSubmit } = useResumeForm(
        id !== 'new'
            ? initFormData(
                  resume?.data!!,
                  careers?.data!!,
                  awards?.data!!,
                  activities?.data!!,
                  educations?.data!!,
                  licenses?.data!!,
                  descriptions?.data!!,
                  links?.data!!,
                  languageLevels?.data!!,
                  languageTests?.data!!
              )
            : undefined
    )
    const [isCareerOpen, toggleCareer] = useToggle(!!careers?.data?.item_list.length)
    const [isLicenseOpen, toggleLicense] = useToggle(!!licenses?.data?.item_list.length)
    const [isLanguageLevelOpen, toggleLanguageLevel] = useToggle(!!languageLevels?.data?.item_list.length)
    const [isLanguageTestOpen, toggleLanguageTest] = useToggle(!!languageTests?.data?.item_list.length)
    const [isEducationOpen, toggleEducation] = useToggle(!!educations?.data?.item_list.length)
    const [isActivityOpen, toggleActivity] = useToggle(!!activities?.data?.item_list.length)
    const [isAwardOpen, toggleAward] = useToggle(!!awards?.data?.item_list.length)
    const [isDescriptionOpen, toggleDescription] = useToggle(!!descriptions?.data?.item_list.length)
    const [isLinkOpen, toggleLink] = useToggle(!!links?.data?.item_list.length)

    const createMutation = useMutationCreateResume()
    const updateMutation = useMutationUpdateResume()
    const detailMutation = useMutationDetailResume()
    const descriptionMutation = useMutationDescriptionResume()

    const navigate = useNavigate()

    const formSubmit = async (data: ResumeFormData) => {
        if (!validation(data)) {
            alert('필수항목을 모두 채워주세요')
            return false
        }
        if (data.id) {
            updateMutation.mutateAsync(data)
        } else {
            const result = await createMutation.mutateAsync(data)
            if (!result.data || result.error) {
                console.error(result.error)
                alert(result.error?.message)
            } else {
                data.id = result.data.resume_id
            }
        }
        const detailResult = await detailMutation.mutateAsync(data)
        const descrptionResult = await descriptionMutation.mutateAsync(data)
        if (detailResult.data && descrptionResult.data) {
            navigate({ pathname: '/resumes' })
        } else {
            console.error(detailResult.error)
            console.error(descrptionResult)
            alert('저장에 실패하였습니다.')
        }
    }

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: '이력서 목록', path: '/resumes' },
                    { label: '이력서 등록', path: '/resumes/new', active: true },
                ]}
                title={'이력서 등록'}
            />
            <Row>
                <form onSubmit={handleSubmit(formSubmit)} autoComplete="off">
                    <Col>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <h4 className="page-title mb-3">기본정보</h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <BasicForm
                                            control={control}
                                            errors={errors}
                                            register={register}
                                            setValue={setValue}
                                        />
                                        <Suspense
                                            fallback={
                                                <Row style={{ minHeight: 91.594 }}>
                                                    <Col></Col>
                                                </Row>
                                            }
                                        >
                                            <JobCategorySelect
                                                containerClass="mb-3"
                                                control={control}
                                                errors={errors}
                                                depth1Name="depth1JobCategory"
                                                depth2Name="depth2JobCategory"
                                                depth3Name="depth3JobCategoryList"
                                                depth1Value={{
                                                    label: resume?.data?.item.depth1JobCategory.name!!,
                                                    value: resume?.data?.item.depth1JobCategory.id!!,
                                                }}
                                                depth2Value={{
                                                    label: resume?.data?.item.depth2JobCategory.name!!,
                                                    value: resume?.data?.item.depth2JobCategory.id!!,
                                                }}
                                            />
                                        </Suspense>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Row>
                                    <Col xl={11}>
                                        <h4 className="page-title">경력</h4>
                                    </Col>
                                    <Col>
                                        <Link to="#">
                                            <h4
                                                onClick={() => {
                                                    toggleCareer()
                                                }}
                                            >
                                                {isCareerOpen ? (
                                                    <i className="mdi mdi-chevron-up accordion-arrow"></i>
                                                ) : (
                                                    <i className="mdi mdi-chevron-down accordion-arrow"></i>
                                                )}
                                            </h4>
                                        </Link>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Collapse in={isCareerOpen}>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <CareerForm control={control} errors={errors} register={register} />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Row>
                                    <Col xl={11}>
                                        <h4 className="page-title">자격증</h4>
                                    </Col>
                                    <Col>
                                        <Link to="#">
                                            <h4
                                                onClick={() => {
                                                    toggleLicense()
                                                }}
                                            >
                                                {isLicenseOpen ? (
                                                    <i className="mdi mdi-chevron-up accordion-arrow"></i>
                                                ) : (
                                                    <i className="mdi mdi-chevron-down accordion-arrow"></i>
                                                )}
                                            </h4>
                                        </Link>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Collapse in={isLicenseOpen}>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <LicenseForm
                                                setValue={setValue}
                                                control={control}
                                                errors={errors}
                                                register={register}
                                            />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Row>
                                    <Col xl={11}>
                                        <h4 className="page-title">외국어 능력 시험</h4>
                                    </Col>
                                    <Col>
                                        <Link to="#">
                                            <h4
                                                onClick={() => {
                                                    toggleLanguageTest()
                                                }}
                                            >
                                                {isLanguageTestOpen ? (
                                                    <i className="mdi mdi-chevron-up accordion-arrow"></i>
                                                ) : (
                                                    <i className="mdi mdi-chevron-down accordion-arrow"></i>
                                                )}
                                            </h4>
                                        </Link>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Collapse in={isLanguageTestOpen}>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <LanguageTestForm control={control} errors={errors} register={register} />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Row>
                                    <Col xl={11}>
                                        <h4 className="page-title">외국어 능력 수준</h4>
                                    </Col>
                                    <Col>
                                        <Link to="#">
                                            <h4
                                                onClick={() => {
                                                    toggleLanguageLevel()
                                                }}
                                            >
                                                {isLanguageLevelOpen ? (
                                                    <i className="mdi mdi-chevron-up accordion-arrow"></i>
                                                ) : (
                                                    <i className="mdi mdi-chevron-down accordion-arrow"></i>
                                                )}
                                            </h4>
                                        </Link>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Collapse in={isLanguageLevelOpen}>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <LanguageLevelForm control={control} errors={errors} register={register} />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Row>
                                    <Col xl={11}>
                                        <h4 className="page-title">교육</h4>
                                    </Col>
                                    <Col>
                                        <Link to="#">
                                            <h4
                                                onClick={() => {
                                                    toggleEducation()
                                                }}
                                            >
                                                {isEducationOpen ? (
                                                    <i className="mdi mdi-chevron-up accordion-arrow"></i>
                                                ) : (
                                                    <i className="mdi mdi-chevron-down accordion-arrow"></i>
                                                )}
                                            </h4>
                                        </Link>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Collapse in={isEducationOpen}>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <EducationForm
                                                setValue={setValue}
                                                control={control}
                                                errors={errors}
                                                register={register}
                                            />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Row>
                                    <Col xl={11}>
                                        <h4 className="page-title">활동</h4>
                                    </Col>
                                    <Col>
                                        <Link to="#">
                                            <h4
                                                onClick={() => {
                                                    toggleActivity()
                                                }}
                                            >
                                                {isActivityOpen ? (
                                                    <i className="mdi mdi-chevron-up accordion-arrow"></i>
                                                ) : (
                                                    <i className="mdi mdi-chevron-down accordion-arrow"></i>
                                                )}
                                            </h4>
                                        </Link>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Collapse in={isActivityOpen}>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <ActivityForm control={control} errors={errors} register={register} />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Row>
                                    <Col xl={11}>
                                        <h4 className="page-title">수상</h4>
                                    </Col>
                                    <Col>
                                        <Link to="#">
                                            <h4
                                                onClick={() => {
                                                    toggleAward()
                                                }}
                                            >
                                                {isAwardOpen ? (
                                                    <i className="mdi mdi-chevron-up accordion-arrow"></i>
                                                ) : (
                                                    <i className="mdi mdi-chevron-down accordion-arrow"></i>
                                                )}
                                            </h4>
                                        </Link>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Collapse in={isAwardOpen}>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <AwardForm control={control} errors={errors} register={register} />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Row>
                                    <Col xl={11}>
                                        <h4 className="page-title">기술서</h4>
                                    </Col>
                                    <Col>
                                        <Link to="#">
                                            <h4
                                                onClick={() => {
                                                    toggleDescription()
                                                }}
                                            >
                                                {isDescriptionOpen ? (
                                                    <i className="mdi mdi-chevron-up accordion-arrow"></i>
                                                ) : (
                                                    <i className="mdi mdi-chevron-down accordion-arrow"></i>
                                                )}
                                            </h4>
                                        </Link>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Collapse in={isDescriptionOpen}>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <DescriptionForm control={control} errors={errors} register={register} />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Row>
                                    <Col xl={11}>
                                        <h4 className="page-title">링크 및 파일</h4>
                                    </Col>
                                    <Col>
                                        <Link to="#">
                                            <h4
                                                onClick={() => {
                                                    toggleLink()
                                                }}
                                            >
                                                {isLinkOpen ? (
                                                    <i className="mdi mdi-chevron-up accordion-arrow"></i>
                                                ) : (
                                                    <i className="mdi mdi-chevron-down accordion-arrow"></i>
                                                )}
                                            </h4>
                                        </Link>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Collapse in={isLinkOpen}>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <LinkForm
                                                setValue={setValue}
                                                control={control}
                                                errors={errors}
                                                register={register}
                                            />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Collapse>
                        </Card>
                    </Col>
                    <div className="d-grid">
                        <Button type="submit">저장</Button>
                    </div>
                </form>
            </Row>
        </>
    )
}

export default EditResume
