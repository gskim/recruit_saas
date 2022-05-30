import { Column } from 'react-table'
import { CellFormatter, Spinner } from 'components'
import { useQuery } from 'react-query'
import { Suspense, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { LicenseModel } from '@recruit/interface'
import { CustomTable } from 'components/table/CustomTable'
import { Link } from 'react-router-dom'
import { licenseList } from 'api'
import { Button } from 'react-bootstrap'
import Loading from 'components/Loading'

interface LicenseTableProps {
    name?: string
    type?: string
    organization?: string
    edit: (id: number, name: string, type: string, organization: string) => void
    remove: (id: number) => void
}

const LicenseTable = ({ name, type, organization, edit, remove }: LicenseTableProps) => {
    const IDColumn = ({ row }: CellFormatter<LicenseModel>) => {
        return (
            <Link to={`#`} className="text-body fw-bold">
                {row.original.id}
            </Link>
        )
    }

    const ActionColumn = ({ row }: CellFormatter<LicenseModel>) => {
        return (
            <>
                <div className="button-list">
                    <Button
                        className="btn-icon"
                        onClick={() =>
                            edit(row.original.id, row.original.name, row.original.type, row.original.organization)
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
            Header: '구분',
            accessor: 'type',
        },
        {
            Header: '조직',
            accessor: 'organization',
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
    }, [name, type, organization])
    const limit = 10
    const {
        error: _error,
        data: result,
    } = useQuery(JSON.stringify({ url: 'licenses', page, name, type, organization }), () => {
        const skip = (page - 1) * limit
        return licenseList({ skip, limit, name, type, organization })
    }, {suspense: true})

    if (_error) {
        return <Navigate to={'/error-500-alt'}></Navigate>
    }
    const data = result?.data.data
    const error = result?.data.error

    let itemList: LicenseModel[] = []
    let totalCount = 0

    if (!data) {
        alert(error?.message)
    } else {
        itemList = data.item_list
        totalCount = data.total_count
    }

    return (
        <Suspense fallback={Loading}>
        <CustomTable<LicenseModel>
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

export default LicenseTable
