import { Card, Col, Row } from 'react-bootstrap'
import { PageTitle } from 'components'
import JobCategoryListGroup from 'components/job_category/JobCategoryListGroup'
import { useState } from 'react'

const JobCategoryList = () => {
    const [depth1ParentId, setDepth1ParentId] = useState<number | null>(null)
    const [depth2ParentId, setDepth2ParentId] = useState<number | null>(null)

    return (
        <>
            <PageTitle
                breadCrumbItems={[{ label: '직무 관리', path: '/job_categories', active: true }]}
                title={'직무 관리'}
            />
            <Row>
                <Col xxl={4}>
                    <Card>
                        <Card.Body>
                            <JobCategoryListGroup
                                parentId={undefined}
                                depth={0}
                                select={(id: number) => {
                                    setDepth1ParentId(id)
                                    setDepth2ParentId(null)
                                }}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col xxl={4}>
                    <Card>
                        <Card.Body>
                            <JobCategoryListGroup
                                parentId={depth1ParentId}
                                depth={1}
                                select={(id: number) => {
                                    setDepth2ParentId(id)
                                }}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col xxl={4}>
                    <Card>
                        <Card.Body>
                            <JobCategoryListGroup depth={2} parentId={depth2ParentId} select={(id: number) => {}} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default JobCategoryList
