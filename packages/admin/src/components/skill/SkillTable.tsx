import { Badge } from 'react-bootstrap'
import { Column } from 'react-table'
import { CellFormatter, Spinner } from 'components'
import { useQuery } from 'react-query'
import { skills } from 'api'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { SkillModel } from '@recruit/interface'
import { CustomTable } from 'components/table/CustomTable'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { S3_URL } from 'appConstants/strings'

const IDColumn = ({ row }: CellFormatter<SkillModel>) => {
    return (
        <Link to={`/skills/${row.original.id}`} className="text-body fw-bold">
            {row.original.id}
        </Link>
    )
}

const AliasColumn = ({ row }: CellFormatter<SkillModel>) => {
    return (
        <>
            {row.original.alias.map((alias) => {
                return (
                    <Badge key={alias} className={classNames('me-1', 'bg-info')}>
                        {alias}
                    </Badge>
                )
            })}
        </>
    )
}

const ImageColumn = ({ row }: CellFormatter<SkillModel>) => {
    const url = S3_URL + row.original.image_key
    return <img src={url} alt="" className={classNames('img-fluid', 'rounded-circle', 'avatar-sm')} />
}

const columns: ReadonlyArray<Column> = [
    {
        Header: 'ID',
        accessor: 'id',
        Cell: IDColumn,
    },
    {
        Header: '기술명',
        accessor: 'name',
    },
    {
        Header: '검색 단어',
        accessor: 'alias',
        Cell: AliasColumn,
    },
    {
        Header: '기술 로고',
        accessor: 'image_key',
        Cell: ImageColumn,
    },
]

interface SkillTableProps {
    alias?: string
    skill_category_id: number
}

const SkillTable = ({ alias, skill_category_id }: SkillTableProps) => {
    const [page, setPage] = useState(1)
    useEffect(() => {
        setPage(1)
    }, [alias])
    const limit = 10
    const {
        isLoading,
        error: _error,
        data: result,
    } = useQuery(JSON.stringify({ name: 'skills', page, alias, skill_category_id }), () => {
        const skip = (page - 1) * limit
        return skills({ skip, limit, skill_category_id })
    })

    if (isLoading) {
        return (
            <>
                <div className="d-flex justify-content-center">
                    <Spinner className="text-primary m-2" color="primary" size={'lg'} />
                </div>
            </>
        )
    }
    if (_error) {
        return <Navigate to={'/error-500-alt'}></Navigate>
    }
    const data = result?.data.data
    const error = result?.data.error

    let itemList: SkillModel[] = []
    let totalCount = 0

    if (!data) {
        alert(error?.message)
    } else {
        itemList = data.item_list
        totalCount = data.total_count
    }

    return (
        <CustomTable<SkillModel>
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

export default SkillTable
