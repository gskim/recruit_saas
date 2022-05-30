import { ResumeLanguageLevelModel } from '@recruit/interface'
import { Col, Row } from 'react-bootstrap'

interface LanguageLevelViewProps {
    itemList: ResumeLanguageLevelModel[]
}

const LanguageLevelView = ({ itemList }: LanguageLevelViewProps) => {
    if (itemList.length === 0) {
        return null
    }
    return (
        <>
            <Row>
                <Col lg={12}>
                    <div className="mb-4">
                        <h2>외국어 능력</h2>
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
                                    <p>{item.grade}</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                )
            })}
        </>
    )
}

export default LanguageLevelView
