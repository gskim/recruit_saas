import { Badge } from 'react-bootstrap'
import { Column } from 'react-table'
import { CellFormatter, Spinner } from 'components'
import { useQuery } from 'react-query'
import { recruitList, skills } from 'api'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { RecruitModel, RecruitProcess, RecruitStatus, SkillModel } from '@recruit/interface'
import { CustomTable } from 'components/table/CustomTable'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { S3_URL } from 'appConstants/strings'
import profile from 'assets/images/profile/profile.jpeg'

const IDColumn = ({ row }: CellFormatter<RecruitModel>) => {
    return (
        <Link to={`/recruits/${row.original.id}`} className="text-body fw-bold">
            {row.original.id}
        </Link>
    )
}

const StatusColumn = ({ row }: CellFormatter<RecruitModel>) => {
    return (
        <>
            <Badge className={classNames('me-1', 'bg-info')}>{row.original.status}</Badge>
        </>
    )
}

const CompanyNameColumn = ({ row }: CellFormatter<RecruitModel>) => {
    return (
        <>
            <Badge className={classNames('me-1', 'bg-primary')}>{row.original.company.company_name}</Badge>
        </>
    )
}

const ProcessColumn = ({ row }: CellFormatter<RecruitModel>) => {
    return (
        <>
            <Badge className={classNames('me-1', 'bg-info')}>{row.original.process}</Badge>
        </>
    )
}

const UserImageColumn = ({ row }: CellFormatter<RecruitModel>) => {
    const url = row.original.resume.resume_profile_image || profile
    return <img src={url} alt="" className={classNames('img-fluid', 'rounded-circle', 'avatar-sm')} />
}

const columns: ReadonlyArray<Column> = [
    {
        Header: 'ID',
        accessor: 'id',
        Cell: IDColumn,
    },
    {
        Header: '제목',
        accessor: 'title',
    },
    {
        Header: '진행여부',
        accessor: 'status',
        Cell: StatusColumn,
    },
    {
        Header: '진행상태',
        accessor: 'process',
        Cell: ProcessColumn,
    },
    {
        Header: '기업',
        accessor: 'company',
        Cell: CompanyNameColumn,
    },
    {
        Header: '구직자',
        accessor: 'resume',
        Cell: UserImageColumn,
    },
]

interface RecruitTableProps {
    company_id: number | null
    user_email: string | null
    process: RecruitProcess | null
    status: RecruitStatus | null
    title: string | null
}

const RecruitTable = ({ company_id, user_email, process, status, title }: RecruitTableProps) => {
    const [page, setPage] = useState(1)
    useEffect(() => {
        setPage(1)
    }, [])
    const limit = 10
    const { data: result } = useQuery(
        JSON.stringify({ name: 'recruits', page, company_id, user_email, process, status }),
        () => {
            const skip = (page - 1) * limit
            return recruitList({ skip, limit, company_id, process, title, user_email, status })
        },
        { suspense: true }
    )

    const data = result?.data
    const error = result?.error

    let itemList: RecruitModel[] = []
    let totalCount = 0

    if (!data) {
        alert(error?.message)
    } else {
        itemList = data.item_list
        totalCount = data.total_count
    }

    return (
        <CustomTable<RecruitModel>
            columns={columns}
            data={itemList}
            pageSize={10}
            pagination={{
                currentPage: page,
                totalCount,
                countPerPage: 10,
                onChange: (v) => {
                    setPage(v)
                },
            }}
            totalCount={Math.round(totalCount / limit)}
        />
    )
}

export default RecruitTable
