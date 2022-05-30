import React from 'react'
import { useTable, Column, Row } from 'react-table'
import classNames from 'classnames'
import { CustomPagination, PaginationProps } from './CustomPagination'
import { Table } from 'react-bootstrap'

export type CellFormatter<T extends Object = {}> = {
    row: Row<T>
}

type TableProps<TableValues> = {
    pagination?: boolean | PaginationProps
    columns: ReadonlyArray<Column>
    data: TableValues[]
    pageSize?: number
    tableClass?: string
    theadClass?: string
    totalCount?: number
}

const CustomTable = <TableValues extends object = {}>(props: TableProps<TableValues>) => {
    const pagination = props['pagination'] || false
    const dataTable = useTable({
        columns: props['columns'],
        data: props['data'],
        initialState: { pageSize: props['pageSize'] || 10 },
    })

    let rows = dataTable.rows
    return (
        <>
            <div className="table-responsive">
                <Table
                    {...dataTable.getTableProps()}
                    className={classNames('table table-centered react-table', props['tableClass'])}
                >
                    <thead className={props['theadClass']}>
                        {dataTable.headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column: any) => (
                                    <th
                                        {...column.getHeaderProps(
                                            column.defaultCanSort && column.getSortByToggleProps()
                                        )}
                                        className={classNames({
                                            sorting_desc: column.isSortedDesc === true,
                                            sorting_asc: column.isSortedDesc === false,
                                            sortable: column.defaultCanSort === true,
                                        })}
                                    >
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...dataTable.getTableBodyProps()}>
                        {(rows || []).map((row, i) => {
                            dataTable.prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>

            {pagination && typeof pagination !== 'boolean' && (
                <CustomPagination
                    totalCount={pagination.totalCount}
                    currentPage={pagination.currentPage}
                    countPerPage={pagination.countPerPage}
                    onChange={pagination.onChange}
                />
            )}
        </>
    )
}

export { CustomTable }
