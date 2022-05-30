import { ResumeDescriptionModel } from '@recruit/interface'
import { Col, Row } from 'react-bootstrap'

interface DescriptionViewProps {
    itemList: ResumeDescriptionModel[]
}

const DescriptionView = ({ itemList }: DescriptionViewProps) => {
    if (itemList.length === 0) {
        return null
    }
    return (
        <>
            <Row>
                <Col lg={12}>
                    <div className="mb-4">
                        <h2>기술서</h2>
                    </div>
                </Col>
            </Row>
            {itemList.map((item) => {
                return (
                    <div key={item.id}>
                        <Row>
                            <Col md={8}>
                                <div>
                                    <h4>{item.title}</h4>
                                    <pre>{item.content}</pre>
                                </div>
                            </Col>
                        </Row>
                    </div>
                )
            })}
        </>
    )
}

export default DescriptionView
