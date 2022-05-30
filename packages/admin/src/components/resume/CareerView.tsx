import { ResumeCareerModel } from '@recruit/interface'
import dayjs from 'dayjs'
import { Col, Row } from 'react-bootstrap'

interface CareerViewProps {
    itemList: ResumeCareerModel[]
}

const CareerView = ({ itemList }: CareerViewProps) => {
    if (itemList.length === 0) {
        return null
    }

    return (
        <>
            <Row>
                <Col lg={12}>
                    <div className="mb-4">
                        <h2>경력</h2>
                    </div>
                </Col>
            </Row>
            {itemList.map((item) => {
                return (
                    <div key={item.id}>
                        <Row>
                            <Col md={4}>
                                <div>
                                    <h4>{item.company_name}</h4>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={8}>
                                <div>
                                    <p>
                                        {dayjs(item.started_at).format('YYYY-MM-DD')} ~{' '}
                                        {item.ended_at ? dayjs(item.ended_at).format('YYYY-MM-DD') : '재직중'}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={1}>
                                <div>
                                    <p>
                                        {item.organization} {' | '}
                                        {item.charge}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={{ span: 2, offset: 1 }}>
                                {item.tasks.map((task) => {
                                    return (
                                        <Row key={task.id}>
                                            <Col lg={12}>
                                                <div>
                                                    <h5>{task.title}</h5>
                                                    <pre>{task.description}</pre>
                                                </div>
                                            </Col>
                                        </Row>
                                    )
                                })}
                            </Col>
                        </Row>
                    </div>
                )
            })}
        </>
    )
}

export default CareerView
