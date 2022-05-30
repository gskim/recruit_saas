import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import avatar3 from 'assets/images/users/avatar-8.jpg'
import { CompanyModel, JobCategoryModel, JobPostStatus, JobPostTerminatedReason } from '@recruit/interface'

interface JobPostCardProps {
    id: number
    title: string
    description: string
    company: CompanyModel
    status: JobPostStatus
    terminatedReason: JobPostTerminatedReason
    recruitCount: number
    depth1JobCategory: JobCategoryModel
}

const JobPostCard = ({
    id,
    title,
    description,
    company,
    status,
    terminatedReason,
    recruitCount,
    depth1JobCategory,
}: JobPostCardProps) => {
    return (
        <Card className="d-block">
            <Card.Body className={''}>
                <h4 className="mt-0">
                    <Link to={`/job_posts/view/${id}`} className="text-title">
                        {title}
                    </Link>
                </h4>

                <div
                    className={classNames(
                        'badge',
                        {
                            'bg-success': status === JobPostStatus.OPEN,
                            'bg-secondary text-light': status === JobPostStatus.CLOSE,
                        },
                        'me-1'
                    )}
                >
                    {status}
                </div>
                <div
                    className={classNames('badge', {
                        'bg-success': terminatedReason === JobPostTerminatedReason.기간만료시,
                        'bg-secondary text-light': terminatedReason === JobPostTerminatedReason.상시채용,
                        'bg-warning': terminatedReason === JobPostTerminatedReason.채용시까지,
                    })}
                >
                    {terminatedReason}
                </div>

                <p className="text-muted font-13 my-3">
                    {description.slice(0, 100)}...
                    <Link to={`/job_posts/view/${id}`} className="fw-bold text-muted">
                        view more
                    </Link>
                </p>

                <p className="mb-1">
                    <span className="pe-2 text-nowrap mb-2 d-inline-block">
                        <i className="mdi mdi-format-list-bulleted-type text-muted me-1"></i>
                        <b>{recruitCount}</b> 채용진행
                    </span>
                </p>
                <div>
                    <Link
                        to="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title=""
                        data-original-title={company.name_ko}
                        className="d-inline-block me-1"
                    >
                        <img src={company.logo_img_url || avatar3} className="rounded-circle avatar-xs" alt="friend" />
                        <div className="d-inline-block text-muted fw-bold ms-2">{company.name_ko}</div>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    )
}

export default JobPostCard
