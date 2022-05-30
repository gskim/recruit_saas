import { Column } from 'react-table'
import { CellFormatter, Spinner } from 'components'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { CompanyModel } from '@recruit/interface'
import { CustomTable } from 'components/table/CustomTable'
import { Link } from 'react-router-dom'
import { companyList } from 'api/company'

const IDColumn = ({ row }: CellFormatter<CompanyModel>) => {
    return (
        <Link to={`/companies/${row.original.id}`} className="text-body fw-bold">
            {row.original.id}
        </Link>
    )
}

const columns: ReadonlyArray<Column> = [
    {
        Header: 'ID',
        accessor: 'id',
        Cell: IDColumn,
    },
    {
        Header: '기업명',
        accessor: 'name_ko',
    },
    {
        Header: '이메일',
        accessor: 'email',
    },
    {
        Header: '전화번호',
        accessor: 'tel',
    },
]

interface CompanyTableProps {
    name?: string
}

const CompanyTable = ({ name }: CompanyTableProps) => {
    const [page, setPage] = useState(1)
    useEffect(() => {
        setPage(1)
    }, [name])
    const limit = 10
    const {
        isLoading,
        error: _error,
        data: result,
    } = useQuery(JSON.stringify({ url: 'companies', page, name }), () => {
        const skip = (page - 1) * limit
        return companyList({ skip, limit, name: name || null })
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

    let itemList: CompanyModel[] = []
    let totalCount = 0

    if (!data) {
        alert(error?.message)
    } else {
        itemList = data.item_list
        totalCount = data.total_count
    }

    return (
        <CustomTable<CompanyModel>
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

export default CompanyTable
