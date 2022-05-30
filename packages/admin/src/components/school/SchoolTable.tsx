import { Column } from 'react-table'
import { CellFormatter, Spinner } from 'components'
import { useQuery } from 'react-query'
import { Suspense, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { SchoolModel } from '@recruit/interface'
import { CustomTable } from 'components/table/CustomTable'
import { Link } from 'react-router-dom'
import { schoolList } from 'api'
import { Button } from 'react-bootstrap'
import Loading from 'components/Loading'

interface SchoolTableProps {
    name?: string
    category1?: string
    category2?: string
    edit: (id: number, name: string, category1: string, category2: string) => void
    remove: (id: number) => void
}

const SchoolTable = ({ name, category1, category2, edit, remove }: SchoolTableProps) => {
    const IDColumn = ({ row }: CellFormatter<SchoolModel>) => {
        return (
            <Link to={`#`} className="text-body fw-bold">
                {row.original.id}
            </Link>
        )
    }

    const ActionColumn = ({ row }: CellFormatter<SchoolModel>) => {
        return (
            <>
                <div className="button-list">
                    <Button
                        className="btn-icon"
                        onClick={() =>
                            edit(row.original.id, row.original.name, row.original.category1, row.original.category2)
                        }
                        variant="outline-primary"
                    >
                        <i className="mdi mdi-square-edit-outline ms-1 me-1"></i>
                    </Button>
                    <Button className="btn-icon" onClick={() => remove(row.original.id)} variant="outline-danger">
                        <i className="mdi mdi-delete ms-1 me-1"></i>
                    </Button>
                </div>
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
            Header: '자격증명',
            accessor: 'name',
        },
        {
            Header: '구분1',
            accessor: 'category1',
        },
        {
            Header: '구분2',
            accessor: 'category2',
        },
        {
            Header: 'Action',
            accessor: 'action',
            Cell: ActionColumn,
        },
    ]

    const [page, setPage] = useState(1)
    useEffect(() => {
        setPage(1)
    }, [name, category1, category2])
    const limit = 10
    const {
        error: _error,
        data: result,
    } = useQuery(JSON.stringify({ url: 'Schools', page, name, category1, category2 }), () => {
        const skip = (page - 1) * limit
        return schoolList({ skip, limit, name, category1, category2 })
    }, {suspense: true})

    if (_error) {
        return <Navigate to={'/error-500-alt'}></Navigate>
    }
    const data = result?.data.data
    const error = result?.data.error

    let itemList: SchoolModel[] = []
    let totalCount = 0

    if (!data) {
        alert(error?.message)
    } else {
        itemList = data.item_list
        totalCount = data.total_count
    }

    return (
        <Suspense fallback={Loading}>
            <CustomTable<SchoolModel>
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
        </Suspense>
    )
}

export default SchoolTable
