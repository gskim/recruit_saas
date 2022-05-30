import { Button, Card, Col, Row } from 'react-bootstrap'
import { CardTitle, PageTitle } from 'components'
import { Suspense } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { jobPostDetail } from 'api'
import { useQuery } from 'react-query'
import Loading from 'components/Loading'
import classNames from 'classnames'
import { JobPostStatus, JobPostTerminatedReason } from '@recruit/interface'
import dayjs from 'dayjs'
import avatar1 from 'assets/images/users/avatar-6.jpg'
import { Link } from 'react-router-dom'
import { S3_URL } from 'appConstants/strings'
import config from 'config'
const JobPostDetail = () => {
    const { id } = useParams()

    const { data } = useQuery(`job_posts/${id}`, () => jobPostDetail(Number(id)), {
        suspense: true,
    })

    if (data && data.error) {
        console.error(data.error)
        return <Navigate to={'/error-500-alt'}></Navigate>
    }

    const jobPost = data?.data?.item!

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: '채용공고 목록', path: '/job_posts' },
                    { label: '채용공고 상세', path: '/job_posts/view', active: true },
                ]}
                title={'채용공고 상세'}
            />
            <Row>
                <Suspense fallback={Loading}>
                    <Col xxl={8} lg={6}>
                        <Card className="d-block">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h3>{jobPost.title}</h3>
                                    <Link to={`/job_posts/${id}`}>
                                        <Button>수정</Button>
                                    </Link>
                                </div>
                                <div
                                    className={classNames(
                                        'badge',
                                        {
                                            'bg-success': jobPost.status === JobPostStatus.OPEN,
                                            'bg-secondary': jobPost.status === JobPostStatus.CLOSE,
                                        },
                                        'text-light',
                                        'me-2',
                                        'mb-3'
                                    )}
                                >
                                    {jobPost.status}
                                </div>
                                <div
                                    className={classNames(
                                        'badge',
                                        {
                                            'bg-success':
                                                jobPost.terminatedReason === JobPostTerminatedReason.기간만료시,
                                            'bg-secondary text-light':
                                                jobPost.terminatedReason === JobPostTerminatedReason.상시채용,
                                            'bg-warning':
                                                jobPost.terminatedReason === JobPostTerminatedReason.채용시까지,
                                        },
                                        'text-light',
                                        'mb-3'
                                    )}
                                >
                                    {jobPost.terminatedReason}
                                </div>
                                <Row className="align-items-center mb-4">
                                    <div className="col-auto">
                                        <img
                                            src={jobPost.company.logo_img_url || avatar1}
                                            className="rounded-circle img-thumbnail avatar-md"
                                            alt="friend"
                                        />
                                    </div>
                                    <div className="col ps-0">
                                        <h4>{jobPost.company.name_ko}</h4>
                                    </div>
                                </Row>

                                <h5>상세 설명</h5>

                                <pre className="text-muted mb-4">{jobPost.description}</pre>
                                <Row>
                                    <Col md={6}>
                                        <div className="mb-4">
                                            <h5>외부 채용공고 링크</h5>
                                            <a href={jobPost.linkUrl} rel="noreferrer" target={'_blank'}>
                                                {jobPost.linkUrl}
                                            </a>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="mb-4">
                                            <h5>근무지</h5>
                                            <p>{jobPost.workPlace}</p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <div className="mb-4">
                                            <h5>경력 타입</h5>
                                            <p>{jobPost.careerType}</p>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="mb-4">
                                            <h5>채용 기간</h5>
                                            <p>{jobPost.terminatedReason}</p>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="mb-4">
                                            <h5>채용 절차</h5>
                                            <p>{jobPost.process.join(' -> ')}</p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={4}>
                                        <div className="mb-4">
                                            <h5>시작일</h5>
                                            <p>{dayjs(jobPost.startedAt).format('YYYY-MM-DD')}</p>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="mb-4">
                                            <h5>종료일</h5>
                                            <p>{jobPost.endedAt ? dayjs(jobPost.endedAt).format('YYYY-MM-DD') : '-'}</p>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="mb-4">
                                            <h5>최소 경력</h5>
                                            <p>{jobPost.careerPeriod} 년</p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    {jobPost.skillList && jobPost.skillList.length > 0 && (
                                        <Col md={4}>
                                            <div className="mb-4">
                                                <h5>관련기술</h5>
                                                <p>{jobPost.skillList.map((skill) => skill.name).join(', ')}</p>
                                            </div>
                                        </Col>
                                    )}
                                    {jobPost.minEducationType && (
                                        <Col md={4}>
                                            <div className="mb-4">
                                                <h5>최소 학력</h5>
                                                <p>{jobPost.minEducationType}</p>
                                            </div>
                                        </Col>
                                    )}
                                    {jobPost.charge && (
                                        <Col md={4}>
                                            <div className="mb-4">
                                                <h5>담당</h5>
                                                <p>{jobPost.charge}</p>
                                            </div>
                                        </Col>
                                    )}
                                </Row>
                                <Row>
                                    {jobPost.minAge && (
                                        <Col md={3}>
                                            <div className="mb-4">
                                                <h5>최소 연령</h5>
                                                <p>{jobPost.minAge} 세</p>
                                            </div>
                                        </Col>
                                    )}
                                    {jobPost.maxAge && (
                                        <Col md={3}>
                                            <div className="mb-4">
                                                <h5>최대 연령</h5>
                                                <p>{jobPost.maxAge} 세</p>
                                            </div>
                                        </Col>
                                    )}
                                    {jobPost.minAnnualIncome && (
                                        <Col md={3}>
                                            <div className="mb-4">
                                                <h5>최소 연봉</h5>
                                                <p>{jobPost.minAnnualIncome} 만원</p>
                                            </div>
                                        </Col>
                                    )}
                                    {jobPost.maxAnnualIncome && (
                                        <Col md={3}>
                                            <div className="mb-4">
                                                <h5>최대 연봉</h5>
                                                <p>{jobPost.maxAnnualIncome} 만원</p>
                                            </div>
                                        </Col>
                                    )}
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xl={4} lg={6}>
                        <Card>
                            <Card.Body>
                                <h5 className="card-title mb-3">관련 파일들</h5>
                                {jobPost.files.map((file, idx) => {
                                    return (
                                        <Card className="mb-1 shadow-none border" key={'file_' + idx}>
                                            <div className="p-2">
                                                <Row className="align-items-center">
                                                    <div className="col-auto">
                                                        <div className="avatar-text">
                                                            <span className="avatar-title rounded">{file.name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col ps-0">
                                                        <Link to="#" className="text-muted fw-bold">
                                                            {file.key}
                                                        </Link>
                                                    </div>
                                                    <div className="col-auto">
                                                        <a href={config.API_URL + '/files/download?' + `key=${file.key}&name=${file.name}`}
                                                        rel="noopener noreferrer"
                                                        download target={'_blank'} className="btn btn-link btn-lg text-muted">
                                                            <i className="dripicons-download"></i>
                                                        </a>
                                                    </div>
                                                </Row>
                                            </div>
                                        </Card>
                                    )
                                })}
                            </Card.Body>
                        </Card>
                    </Col>
                </Suspense>
            </Row>
        </>
    )
}

export default JobPostDetail
