import { Row, Col, Card, Button, Form } from 'react-bootstrap'
import { FormInput, PageTitle } from 'components'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import EmployeeListTable from 'components/employee/EmployeeListTable'
import useEmployeeTableForm, { EmployeeListFormData } from 'components/employee/hooks/useEmployeeListTableForm'
import CompanySearchInput from 'components/form/CompanySearchInput'

const EmployeeList = () => {
    const { handleSubmit, control, register, setValue } = useEmployeeTableForm()
    const [filter, setFilter] = useState<any>({ name: undefined, company: undefined })
    const onSubmit = (value: EmployeeListFormData) => {
        setFilter({
            name: value.name,
            company: value.company,
        })
    }
    return (
        <>
            <PageTitle
                breadCrumbItems={[{ label: '외부직원 관리', path: '/employees', active: true }]}
                title={'외부직원 관리'}
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
                                                    <label className="me-2">이름</label>
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

                                    <Col xl={3}>
                                        <div className="row gy-2 gx-2 align-items-center justify-content-xl-start justify-content-between">
                                            <div className="col-auto">
                                                <div className="d-flex align-items-center w-auto">
                                                    <label className="me-2">기업명</label>
                                                    <CompanySearchInput
                                                        id="company"
                                                        name="company"
                                                        control={control}
                                                        onChange={(v) => {
                                                            if (v) {
                                                                setValue('company', [
                                                                    { label: v.label, value: v.value },
                                                                ])
                                                            } else {
                                                                setValue('company', [])
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xl={2}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Button type="submit">조회</Button>

                                            <Link to="/employees/new">
                                                <Button variant="info">등록</Button>
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                            </form>
                            <EmployeeListTable company={filter.company} name={filter.name} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default EmployeeList
