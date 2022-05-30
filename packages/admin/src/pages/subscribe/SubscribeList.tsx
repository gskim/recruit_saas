import { Row, Col, Card, Button } from 'react-bootstrap'
import { FormInput, PageTitle } from 'components'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import EmployeeListTable from 'components/employee/EmployeeListTable'
import useSubscribeTableForm, { SubscribeListFormData } from 'components/subscribe/hooks/useSubscribeListTableForm'
import CompanySearchInput from 'components/form/CompanySearchInput'
import SubscribeListTable from 'components/subscribe/SubscribeListTable'

const SubscribeList = () => {
    const { handleSubmit, control, register, setValue } = useSubscribeTableForm()
    const [filter, setFilter] = useState<any>({ name: undefined, company: undefined })
    const onSubmit = (value: SubscribeListFormData) => {
        console.log(value)
        setFilter({
            company: value.company,
        })
    }
    return (
        <>
            <PageTitle
                breadCrumbItems={[{ label: '구독 관리', path: '/subscribes', active: true }]}
                title={'구독 관리'}
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
                                                    <CompanySearchInput
                                                        id="company"
                                                        name="company"
                                                        control={control}
                                                        onChange={(v) => {
                                                            if (v) {
                                                                setValue('company', { label: v.label, value: v.value })
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

                                            <Link to="/subscribes/new">
                                                <Button variant="info">등록</Button>
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                            </form>
                            <SubscribeListTable company={filter.company} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default SubscribeList
