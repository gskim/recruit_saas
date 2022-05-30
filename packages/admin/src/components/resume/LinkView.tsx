import { ResumeLinkModel } from '@recruit/interface'
import { APICore } from 'api/apiCore'
import { S3_URL } from 'appConstants/strings'
import config from 'config'
import { Col, Row } from 'react-bootstrap'

interface LinkViewProps {
    itemList: ResumeLinkModel[]
}

const LinkView = ({ itemList }: LinkViewProps) => {
    if (itemList.length === 0) {
        return null
    }
    return (
        <>
            <Row>
                <Col lg={12}>
                    <div className="mb-4">
                        <h2>링크 및 파일</h2>
                    </div>
                </Col>
            </Row>
            {itemList.map((item) => {
                return (
                    <div key={item.type}>
                        <Row>
                            <Col md={8}>
                                <div>
                                    <h4>{item.type}</h4>
                                    {item.key ? (
                                        <>
                                            <a
                                                href={`${config.API_URL}/files/download?key=${item.key}&name=${item.original_name}`}
                                                target={'_blank'}
                                                download={item.original_name}
                                                rel="noreferrer"
                                            >
                                                {item.original_name}
                                            </a>
                                        </>
                                    ) : (
                                        <>
                                            <p>{item.url}</p>
                                        </>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </div>
                )
            })}
        </>
    )
}

export default LinkView
