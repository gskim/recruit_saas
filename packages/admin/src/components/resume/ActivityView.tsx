import { ResumeActivityModel } from '@recruit/interface'
import dayjs from 'dayjs'
import { Col, Row } from 'react-bootstrap'

interface ActivityViewProps {
    itemList: ResumeActivityModel[]
}

const ActivityView = ({ itemList }: ActivityViewProps) => {
    if (itemList.length === 0) {
        return null
    }
    return (
        <>
            <Row>
                <Col lg={12}>
                    <div className="mb-4">
                        <h2>활동</h2>
                    </div>
                </Col>
            </Row>
            {itemList.map((item) => {
                return (
                    <div key={item.title}>
                        <Row>
                            <Col md={6}>
                                <div>
                                    <h4>{item.title}</h4>
                                    <p>
                                        {dayjs(item.started_at).format('YYYY-MM-DD')} ~{' '}
                                        {item.ended_at ? dayjs(item.ended_at).format('YYYY-MM-DD') : '-'}
                                    </p>
                                    <pre className="text-muted">{item.description}</pre>
                                </div>
                            </Col>
                        </Row>
                    </div>
                )
            })}
        </>
    )
}

export default ActivityView
