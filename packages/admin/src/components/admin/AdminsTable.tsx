import { Badge } from 'react-bootstrap'
import { Column } from 'react-table'
import { CellFormatter } from 'components'
import { useQuery } from 'react-query'
import { admins } from 'api'
import { Suspense, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AdminModel, AdminStatus } from '@recruit/interface'
import { CustomTable } from 'components/table/CustomTable'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import profile from 'assets/images/profile/profile.jpeg'
import Loading from 'components/Loading'

const IDColumn = ({ row }: CellFormatter<AdminModel>) => {
    return (
        <Link to={`/admins/${row.original.id}`} className="text-body fw-bold">
            {row.original.id}
        </Link>
    )
}

const ProfileImageColumn = ({ row }: CellFormatter<AdminModel>) => {
    const profileImage = row.original.profile_image || profile
    return <img src={profileImage} alt="" className={classNames('img-fluid', 'rounded-circle', 'avatar-sm')} />
}
const StatusColumn = ({ row }: CellFormatter<AdminModel>) => {
    let color = 'primary'
    switch (row.original.status) {
        case AdminStatus.APPROVE:
            color = 'primary'
            break
        case AdminStatus.DELETE:
            color = 'danger'
            break
        case AdminStatus.REJECT:
            color = 'info'
            break
        case AdminStatus.WAIT:
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
                {row.original.status}
            </Badge>
        </>
    )
}

const RolesColumn = ({ row }: CellFormatter<AdminModel>) => {
    return (
        <>
            {row.original.roles.map((role) => {
                return (
                    <Badge key={role} className={classNames('me-1', 'bg-secondary')}>
                        {role}
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
        Header: '닉네임',
        accessor: 'nickname',
    },
    {
        Header: '이메일',
        accessor: 'email',
    },
    {
        Header: '프로필이미지',
        accessor: 'profile_image',
        Cell: ProfileImageColumn,
    },
    {
        Header: '권한',
        accessor: 'roles',
        Cell: RolesColumn,
    },
    {
        Header: '상태',
        accessor: 'status',
        Cell: StatusColumn,
    },
]

interface AdminsTableProps {
    nickname?: string
    email?: string
    status?: AdminStatus | null
    id?: number
}

const AdminsTable = ({ nickname, email, status }: AdminsTableProps) => {
    const [page, setPage] = useState(1)
    useEffect(() => {
        setPage(1)
    }, [status, nickname, email])
    const limit = 10
    const {
        isLoading,
        error: _error,
        data: result,
    } = useQuery(JSON.stringify({ name: 'admins', page, status, nickname, email }), () => {
        const skip = (page - 1) * limit
        return admins({ skip, limit, status, nickname, email })
    }, {suspense: true})

    if (_error || result?.data.error) {
        console.error(_error)
        console.error(result?.data.error)
        return <Navigate to={'/error-500-alt'}></Navigate>
    }
    const data = result?.data.data
    const error = result?.data.error

    let itemList: AdminModel[] = []
    let totalCount = 0

    if (!data) {
        alert(error?.message)
    } else {
        itemList = data.item_list
        totalCount = data.total_count
    }

    return (
        <Suspense fallback={Loading}>
        <CustomTable<AdminModel>
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

export default AdminsTable
