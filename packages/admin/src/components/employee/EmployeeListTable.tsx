import { Badge } from 'react-bootstrap'
import { Column } from 'react-table'
import { CellFormatter, Spinner } from 'components'
import { useQuery } from 'react-query'
import { employees } from 'api'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { EmployeeModel, EmployeeStatus } from '@recruit/interface'
import { CustomTable } from 'components/table/CustomTable'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { CompanySearchOption } from 'appConstants/options'

const IDColumn = ({ row }: CellFormatter<EmployeeModel>) => {
    return (
        <Link to={`/employees/${row.original.id}`} className="text-body fw-bold">
            {row.original.id}
        </Link>
    )
}

const StatusColumn = ({ row }: CellFormatter<EmployeeModel>) => {
    let color = 'primary'
    switch (row.original.status) {
        case EmployeeStatus.OPEN:
            color = 'primary'
            break
        case EmployeeStatus.CLOSE:
            color = 'danger'
            break
    }
    return (
        <>
            <Badge
                className={classNames('me-1', 'bg-' + color, color === 'light' ? 'text-dark' : null, {
                    'text-light': ['secondary', 'dark'].includes(color),
                })}
            >
                {row.original.status}
            </Badge>
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
        Header: '이름',
        accessor: 'name',
    },
    {
        Header: '이메일',
        accessor: 'email',
    },
    {
        Header: '회사명',
        accessor: 'company.name_ko',
    },
    {
        Header: '상태',
        accessor: 'status',
        Cell: StatusColumn,
    },
]

interface EmployeeListTableProps {
    name?: string
    company?: CompanySearchOption[]
}

const EmployeeListTable = ({ name, company }: EmployeeListTableProps) => {
    const [page, setPage] = useState(1)
    useEffect(() => {
        setPage(1)
    }, [name, company])
    const limit = 10
    const {
        isLoading,
        error: _error,
        data: result,
    } = useQuery(JSON.stringify({ url: 'employees', page, name, company }), () => {
        const skip = (page - 1) * limit
        let companyId = null
        if (company && company.length) {
            companyId = company[0].value
        }
        return employees({ skip, limit, name: name || null, company_id: companyId })
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

    let itemList: EmployeeModel[] = []
    let totalCount = 0

    if (!data) {
        alert(error?.message)
    } else {
        itemList = data.item_list
        totalCount = data.total_count
    }

    return (
        <CustomTable<EmployeeModel>
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

export default EmployeeListTable
