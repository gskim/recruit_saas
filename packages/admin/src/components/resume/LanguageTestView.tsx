import { ResumeLanguageTestModel } from '@recruit/interface'
import dayjs from 'dayjs'
import { Col, Row } from 'react-bootstrap'

interface LanguageTestViewProps {
    itemList: ResumeLanguageTestModel[]
}

const LanguageTestView = ({ itemList }: LanguageTestViewProps) => {
    if (itemList.length === 0) {
        return null
    }
    return (
        <>
            <Row>
                <Col lg={12}>
                    <div className="mb-4">
                        <h2>외국어 시험</h2>
                    </div>
                </Col>
            </Row>
            {itemList.map((item) => {
                return (
                    <div key={item.type}>
                        <Row>
                            <Col md={6}>
                                <div>
                                    <h4>{item.type}</h4>
                                    <p>
                                        {dayjs(item.applied_at).format('YYYY-MM-DD')}
                                        {' | '}
                                        {item.score}
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

export default LanguageTestView
