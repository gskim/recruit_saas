import { ResumeModel } from '@recruit/interface'
import { Col, Row } from 'react-bootstrap'

interface BasicViewProps {
    item: ResumeModel
}

const BasicView = ({ item }: BasicViewProps) => {
    return (
        <>
            <Row>
                <Col lg={12}>
                    <div className="mb-4">
                        <h2>기본 정보</h2>
                    </div>
                </Col>
            </Row>
            <Row>
            <Col md={4}>
                    <div className="mb-4">
                        <h4 className="mb-3">{item.name}</h4>
                        <p>{item.email}</p>
                        <p>{item.phone}</p>
                        <p>{item.birthday}</p>
                        <p>
                            {/* {item.depth1JobCategory.name}{' -> '}
				{item.depth2JobCategory.name}{' -> '} */}
                            {item.depth3JobCategoryList.map((jc) => jc.name).join(', ')}
                        </p>
                        <p>{item.skillList.map((skill) => skill.name).join(', ')}</p>
                    </div>
                </Col>
                <Col md={4}></Col>
                <Col md={4}>
                    {item.profileImage && (
                        <img style={{width: 120, height: 160}} src={item.profileImage} />
                    )}
                </Col>
            </Row>
        </>
    )
}

export default BasicView
