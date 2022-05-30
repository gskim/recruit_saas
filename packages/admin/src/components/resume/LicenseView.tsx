import { ResumeLicenseModel } from '@recruit/interface'
import dayjs from 'dayjs'
import { Col, Row } from 'react-bootstrap'

interface LicenseViewProps {
    itemList: ResumeLicenseModel[]
}

const LicenseView = ({ itemList }: LicenseViewProps) => {
    if (itemList.length === 0) {
        return null
    }
    return (
        <>
            <Row>
                <Col lg={12}>
                    <div className="mb-4">
                        <h2>자격증</h2>
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
                                        {dayjs(item.applied_at).format('YYYY-MM-DD')}
                                        {' | '}
                                        {item.organization}
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

export default LicenseView
