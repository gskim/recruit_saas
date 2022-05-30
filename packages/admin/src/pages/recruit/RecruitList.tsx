import { Row, Col, Card, Button, FormGroup, Form, InputGroup } from 'react-bootstrap'
import { FormInput, FormSelect, PageTitle } from 'components'
import { Suspense, useState } from 'react'
import { recruitProcessOptions, recruitStatusOptions } from 'appConstants/options'
import { Link } from 'react-router-dom'
import Loading from 'components/Loading'
import RecruitTable from 'components/recruit/RecruitTable'
import useRecruitTableForm, { RecruitFormData } from 'components/recruit/hooks/useRecruitTableForm'
import CompanySearchInput from 'components/form/CompanySearchInput'

const RecruitList = () => {
    const { handleSubmit, control, register, setValue } = useRecruitTableForm()
    const [filter, setFilter] = useState<any>({})
    const onSubmit = (value: RecruitFormData) => {
        setFilter({
            title: value.title,
            user_email: value.user_email,
            status: value.status?.value,
            company_id: value.company?.value,
            process: value.process?.value,
        })
    }
    return (
        <>
            <PageTitle
                breadCrumbItems={[{ label: '채용프로세스 목록', path: '/recruits', active: true }]}
                title={'채용프로세스 목록'}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Row className="mb-2">
                                    <Col xl={3}>
                                        <FormInput
                                            label="제목"
                                            type="text"
                                            name="title"
                                            className="form-control"
                                            register={register}
                                            key="title"
                                            control={control}
                                        />
                                    </Col>
                                    <Col xl={3}>
                                        <FormInput
                                            label="이메일"
                                            type="text"
                                            name="user_email"
                                            className="form-control"
                                            register={register}
                                            key="user_email"
                                            control={control}
                                        />
                                    </Col>
                                    <Col xl={3}>
                                        <CompanySearchInput
                                            label="기업"
                                            id="company"
                                            name="company"
                                            control={control}
                                            onChange={(v) => {
                                                if (v) {
                                                    setValue('company', { label: v.label, value: v.value })
                                                } else {
                                                    setValue('company', undefined)
                                                }
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col xl={3}>
                                        <FormSelect
                                            isClearable={true}
                                            isMulti={false}
                                            label="진행여부"
                                            labelClassName="me-2"
                                            name="status"
                                            control={control}
                                            options={recruitStatusOptions}
                                        />
                                    </Col>

                                    <Col xl={3}>
                                        <FormSelect
                                            isClearable={true}
                                            isMulti={false}
                                            label="진행상태"
                                            labelClassName="me-2"
                                            name="process"
                                            control={control}
                                            options={recruitProcessOptions}
                                        />
                                    </Col>
                                    <Col xl={2}>
                                        <Form.Group>
                                            <Form.Label>ㅤ</Form.Label>
                                            <InputGroup>
                                                <Button className="me-2" type="submit">
                                                    조회
                                                </Button>

                                                <Link to="/recruits/new">
                                                    <Button variant="info">등록</Button>
                                                </Link>
                                            </InputGroup>
                                        </Form.Group>

                                        {/* <div className="d-flex justify-content-between align-items-center">

                                        </div> */}
                                    </Col>
                                </Row>
                            </form>
                            <Suspense fallback={Loading}>
                                <RecruitTable
                                    status={filter.status}
                                    process={filter.process}
                                    user_email={filter.user_email}
                                    company_id={filter.company_id}
                                    title={filter.title}
                                />
                            </Suspense>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default RecruitList
