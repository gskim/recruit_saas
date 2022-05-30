import { Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap'
import { FormInput, FormSelect, PageTitle } from 'components'
import { Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import ResumeListTable from 'components/resume/ResumeListTable'
import Loading from 'components/Loading'
import useResumeTableForm, { ResumeListFormData } from 'components/resume/hooks/useResumeListTableForm'
import SkillSearchInput from 'components/form/SkillSearchInput'
import JobCategorySelect from 'components/form/JobCategorySelect'
import { educationTypeOptions } from 'appConstants/options'
import LicenseSearchInput from 'components/form/LicenseSearchInput'
import SchoolSearchInput from 'components/form/SchoolSearchInput'
import LanguageLevelGradeSelect from 'components/form/LanguageLevelGradeSelect'
import LanguageLevelTypeSelect from 'components/form/LanguageLevelTypeSelect'

const ResumeList = () => {
    const { handleSubmit, control, register } = useResumeTableForm()
    const [filter, setFilter] = useState<any>({ username: undefined })
    const onSubmit = (value: ResumeListFormData) => {
        setFilter({
            username: value.username,
            email: value.email,
            skillIdList: value.skillList?.map((skill) => skill.value),
            depth1JobCategoryId: value.depth1JobCategory?.value,
            depth2JobCategoryId: value.depth2JobCategory?.value,
            depth3JobCategoryIdList: value.depth3JobCategoryList?.map((jc) => jc.value),
            educationLastType: value.educationLastType?.value,
            licenseId: value.license?.value,
            schoolId: value.school?.value,
            languageLevelType: value.languageLevelType?.value,
            languageLevelGrade: value.languageLevelGrade?.value,
        })
    }
    return (
        <>
            <PageTitle
                breadCrumbItems={[{ label: '이력서 목록', path: '/resumes', active: true }]}
                title={'이력서 목록'}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Row className="mb-2">
                                    <Col xl={12}>
                                        <JobCategorySelect
                                            depth1Name="depth1JobCategory"
                                            depth2Name="depth2JobCategory"
                                            depth3Name="depth3JobCategoryList"
                                            control={control}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-2"></Row>
                                <Row className="mb-2">
                                    <Col lg={6}>
                                        <label className="mb-2">기술스택</label>
                                        <SkillSearchInput id="skillList" name="skillList" control={control} />
                                    </Col>
                                    <Col lg={6}>
                                        <FormSelect
                                            isClearable
                                            labelClassName="mb-2"
                                            label="최종학력"
                                            name={`educationLastType`}
                                            control={control}
                                            options={educationTypeOptions}
                                            isMulti={false}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col lg={6}>
                                        <label className="mb-2">자격증명</label>
                                        <LicenseSearchInput name="license" id="license" control={control} />
                                    </Col>
                                    <Col lg={6}>
                                        <label className="mb-2">학교명</label>
                                        <SchoolSearchInput id="school" name="school" control={control} />
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col lg={6}>
                                        <label className="mb-2">외국어 능력 언어명</label>
                                        <LanguageLevelTypeSelect name={`languageLevelType`} control={control} />
                                    </Col>
                                    <Col lg={6}>
                                        <label className="mb-2">외국어 능력 수준</label>
                                        <LanguageLevelGradeSelect name={`languageLevelGrade`} control={control} />
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col xl={4}>
                                        <label className="mb-2">이메일</label>
                                        <FormInput
                                            name="email"
                                            className="form-control chat-input"
                                            register={register}
                                            key="email"
                                            control={control}
                                        />
                                    </Col>
                                    <Col xl={4}>
                                        <label className="mb-2">이름</label>
                                        <FormInput
                                            type="text"
                                            name="username"
                                            className="form-control chat-input"
                                            register={register}
                                            key="username"
                                            control={control}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col xl={2}>
                                        <Form.Label className="mb-2">ㅤ</Form.Label>
                                        <InputGroup>
                                            <Button type="submit" className="me-2">
                                                조회
                                            </Button>

                                            <Link to="/resumes/new">
                                                <Button variant="info">등록</Button>
                                            </Link>
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </form>
                            <Suspense fallback={Loading}>
                                <ResumeListTable {...filter} />
                            </Suspense>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ResumeList
