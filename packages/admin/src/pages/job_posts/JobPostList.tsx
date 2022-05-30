import { Button, Col, Row } from 'react-bootstrap'
import { CustomPagination, PageTitle } from 'components'
import { Suspense, useState } from 'react'
import { useQuery } from 'react-query'
import { jobPosts } from 'api'
import JobPostCard from 'components/job_post/JobPostCard'
import { Link } from 'react-router-dom'

const JobPostList = () => {
    const [page, setPage] = useState(1)
    const limit = 8
    const { data } = useQuery(
        ['job_posts', page],
        () => {
            const skip = (page - 1) * limit
            return jobPosts({ skip, limit, title: null })
        },
        { suspense: true }
    )

    if (!data?.data) {
        console.error(data?.error)
        return <></>
    }

    const itemList = data.data?.itemList
    const totalCount = data.data?.totalCount

    return (
        <>
            <PageTitle
                breadCrumbItems={[{ label: '채용공고 목록', path: '/job_posts', active: true }]}
                title={'채용공고 목록'}
            />
            <Row className="mb-2">
                <Col sm={4}>
                    <Link to={'new'}>
                        <Button variant="danger" className="rounded-pill mb-3">
                            <i className="mdi mdi-plus"></i> 채용공고 생성
                        </Button>
                    </Link>
                </Col>
                <Col sm={8}></Col>
            </Row>
            <Suspense fallback={<></>}>
                <Row>
                    {itemList?.map((item, i) => {
                        return (
                            <Col md={6} xxl={3} key={'jobPost-' + item.id}>
                                <JobPostCard
                                    id={item.id}
                                    title={item.title}
                                    description={item.description}
                                    status={item.status}
                                    terminatedReason={item.terminatedReason}
                                    recruitCount={0}
                                    company={item.company}
                                    depth1JobCategory={item.depth1JobCategory}
                                />
                            </Col>
                        )
                    })}
                </Row>
                <Row>
                    <CustomPagination
                        totalCount={totalCount}
                        currentPage={page}
                        countPerPage={limit}
                        onChange={(page) => setPage(page)}
                    />
                </Row>
            </Suspense>
        </>
    )
}

export default JobPostList
