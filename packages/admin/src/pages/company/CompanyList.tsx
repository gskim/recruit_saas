import { Row, Col, Card, Button } from 'react-bootstrap'
import { FormInput, PageTitle } from 'components'
import { useState } from 'react'
import useComapnyTableForm, { CompanyFormData } from 'pages/company/hooks/useCompanyTableForm'
import CompanyTable from 'components/company/CompanyTable'
import { Link } from 'react-router-dom'

const CompanyList = () => {
    const { handleSubmit, control, register } = useComapnyTableForm()
    const [filter, setFilter] = useState<any>({})
    const onSubmit = (value: CompanyFormData) => {
        setFilter({
            name: value.name,
        })
    }

    return (
        <>
            <PageTitle
                breadCrumbItems={[{ label: '기업 목록', path: '/companies', active: true }]}
                title={'기업 목록'}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Row className="mb-2">
                                    <Col xl={3}>
                                        <div className="row gy-2 gx-2 align-items-center justify-content-xl-start justify-content-between">
                                            <div className="col-auto">
                                                <div className="d-flex align-items-center w-auto">
                                                    <label className="me-2">기업명</label>
                                                    <FormInput
                                                        type="text"
                                                        name="name"
                                                        className="form-control chat-input"
                                                        register={register}
                                                        key="name"
                                                        control={control}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xl={{ span: 2, offset: 7 }}>
                                        <div className="col-auto">
                                            <Button className="me-2" type="submit">
                                                조회
                                            </Button>
                                            <Link to="new">
                                                <Button>등록</Button>
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                            </form>
                            <CompanyTable name={filter.name} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default CompanyList
