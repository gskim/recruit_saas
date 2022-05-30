import { ResumeEducationModel } from '@recruit/interface'
import dayjs from 'dayjs'
import { Col, Row } from 'react-bootstrap'

interface EducationViewProps {
    itemList: ResumeEducationModel[]
}

const EducationView = ({ itemList }: EducationViewProps) => {
    if (itemList.length === 0) {
        return null
    }
    return (
        <>
            <Row>
                <Col lg={12}>
                    <div className="mb-4">
                        <h2>교육</h2>
                    </div>
                </Col>
            </Row>
            {itemList.map((item) => {
                return (
                    <div key={item.name}>
                        <Row>
                            <Col md={6}>
                                <div>
                                    <h4>{item.name}</h4>
                                    <p>
                                        {dayjs(item.started_at).format('YYYY-MM-DD')} ~{' '}
                                        {item.ended_at ? dayjs(item.ended_at).format('YYYY-MM-DD') : '-'}
                                    </p>
                                    <p>
                                        {item.major}
                                        {' | '}
                                        {item.status}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                )
            })}
        </>
    )
}

export default EducationView
