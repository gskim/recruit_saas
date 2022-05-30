import { Badge } from 'react-bootstrap'
import { Column } from 'react-table'
import { CellFormatter, Spinner } from 'components'
import { useQuery } from 'react-query'
import { subscribes } from 'api'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { SubscribeModel, SubscribePolicyType } from '@recruit/interface'
import { CustomTable } from 'components/table/CustomTable'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { CompanySearchOption } from 'appConstants/options'
import dayjs from 'dayjs'

const IDColumn = ({ row }: CellFormatter<SubscribeModel>) => {
    return (
        <Link to={`/subscribes/${row.original.id}`} className="text-body fw-bold">
            {row.original.id}
        </Link>
    )
}

const PolicyTypeColumn = ({ row }: CellFormatter<SubscribeModel>) => {
    let color = 'primary'
    switch (row.original.subscribe_policy.type) {
        case SubscribePolicyType.BASIC:
            color = 'primary'
            break
        case SubscribePolicyType.PREMIUM:
            color = 'warning'
            break
    }
    return (
        <>
            <Badge
                className={classNames('me-1', 'bg-' + color, color === 'light' ? 'text-dark' : null, {
                    'text-light': ['secondary', 'dark'].includes(color),
                })}
            >
                {row.original.subscribe_policy.type}
            </Badge>
        </>
    )
}

const StartedDateColumn = ({ row }: CellFormatter<SubscribeModel>) => {
    return <>{dayjs(row.original.started_at).format('YYYY-MM-DD')}</>
}

const EndedDateColumn = ({ row }: CellFormatter<SubscribeModel>) => {
    return <>{dayjs(row.original.started_at).format('YYYY-MM-DD')}</>
}

const columns: ReadonlyArray<Column> = [
    {
        Header: 'ID',
        accessor: 'id',
        Cell: IDColumn,
    },
    {
        Header: '회사명',
        accessor: 'company.name_ko',
    },
    {
        Header: '시작일',
        accessor: 'started_at',
        Cell: StartedDateColumn,
    },
    {
        Header: '종료일',
        accessor: 'ended_at',
        Cell: EndedDateColumn,
    },
    {
        Header: '가격',
        accessor: 'price',
    },
    {
        Header: '정책타입',
        accessor: 'subscribe_policy.type',
        Cell: PolicyTypeColumn,
    },
]

interface SubscribeListTableProps {
    company?: CompanySearchOption
}

const SubscribeListTable = ({ company }: SubscribeListTableProps) => {
    const [page, setPage] = useState(1)
    useEffect(() => {
        setPage(1)
    }, [company])
    const limit = 10
    const {
        isLoading,
        error: _error,
        data: result,
    } = useQuery(JSON.stringify({ url: 'subscribes', page, company }), () => {
        const skip = (page - 1) * limit
        let companyId = null
        if (company) {
            companyId = company.value
        }
        return subscribes({ skip, limit, company_id: companyId })
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

    let itemList: SubscribeModel[] = []
    let totalCount = 0

    if (!data) {
        alert(error?.message)
    } else {
        itemList = data.item_list
        totalCount = data.total_count
    }

    return (
        <CustomTable<SubscribeModel>
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

export default SubscribeListTable
