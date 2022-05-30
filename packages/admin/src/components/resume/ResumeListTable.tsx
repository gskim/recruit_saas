import { Badge, Button } from 'react-bootstrap'
import { Column } from 'react-table'
import { CellFormatter } from 'components'
import { useQuery } from 'react-query'
import { resumeList } from 'api'
import { useEffect, useState } from 'react'
import { ResumeEducationType, ResumeLanguageLevelType, ResumeModel } from '@recruit/interface'
import { CustomTable } from 'components/table/CustomTable'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

const IDColumn = ({ row }: CellFormatter<ResumeModel>) => {
    return (
        <Link to={`/resumes/view/${row.original.id}`} className="text-body fw-bold">
            {row.original.id}
        </Link>
    )
}

const ActionColumn = ({ row }: CellFormatter<ResumeModel>) => {
    return (
        <Link to={`/resumes/${row.original.id}`} className="text-body fw-bold">
            <Button>수정</Button>
        </Link>
    )
}

const Depth1JobCategoryColumn = ({ row }: CellFormatter<ResumeModel>) => {
    let color = 'primary'

    return (
        <>
            <Badge
                className={classNames('me-1', 'bg-' + color, color === 'light' ? 'text-dark' : null, {
                    'text-light': ['secondary', 'dark'].includes(color),
                })}
            >
                {row.original.depth1JobCategory.name}
            </Badge>
        </>
    )
}

const SkillColumn = ({ row }: CellFormatter<ResumeModel>) => {
    let color = 'primary'
    return (
        <>
            {row.original.skillList.map((skill) => {
                return (
                    <Badge
                        key={skill.id}
                        className={classNames('me-1', 'bg-' + color, color === 'light' ? 'text-dark' : null, {
                            'text-light': ['secondary', 'dark'].includes(color),
                        })}
                    >
                        {skill.name}
                    </Badge>
                )
            })}
        </>
    )
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
        Header: '이름',
        accessor: 'name',
    },
    {
        Header: '이메일',
        accessor: 'email',
    },
    {
        Header: '직군',
        accessor: 'depth1JobCategory',
        Cell: Depth1JobCategoryColumn,
    },
    {
        Header: '기술스택',
        accessor: 'skills',
        Cell: SkillColumn,
    },
    {
        Header: '액션',
        accessor: 'action',
        Cell: ActionColumn,
    },
]

interface ResumeListTableProps {
    username?: string
    email?: string
    skillIdList?: number[]
    depth1JobCategoryId?: number
    depth2JobCategoryId?: number
    depth3JobCategoryIdList?: number[]
    educationLastType?: ResumeEducationType
    age?: number
    licenseId?: number
    schoolId?: number
    languageLevelType?: ResumeLanguageLevelType
    languageLevelGrade?: string
}

const ResumeListTable = (props: ResumeListTableProps) => {
    const [page, setPage] = useState(1)
    useEffect(() => {
        setPage(1)
    }, [props])
    const limit = 10
    const { data } = useQuery(
        JSON.stringify({ url: 'resumes', page, ...props }),
        () => {
            const skip = (page - 1) * limit
            return resumeList({ skip, limit, ...props })
        },
        { suspense: true }
    )

    let itemList: ResumeModel[] = []
    let totalCount = 0

    if (!data?.data) {
        console.error(data?.error)
        alert(data?.error?.message)
    } else {
        itemList = data.data?.item_list
        totalCount = data.data?.total_count
    }

    return (
        <CustomTable<ResumeModel>
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

export default ResumeListTable
