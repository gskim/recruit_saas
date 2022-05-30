import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

export type PaginationProps = {
    totalCount: number
    currentPage: number
    countPerPage: number
    onChange: (page: number) => void
}

const CustomPagination = ({ totalCount, currentPage, countPerPage, onChange }: PaginationProps) => {
    /**
     * pagination count , index
     */
    let pageCount = Math.floor(totalCount / countPerPage)
    if (pageCount < 1) {
        pageCount = 1
    } else {
        pageCount++
    }

    const filterPages = useCallback(
        (visiblePages: number[]) => {
            return visiblePages.filter((page: number) => page <= pageCount)
        },
        [pageCount]
    )
    /**
     * handle visible pages
     */
    const getVisiblePages = useCallback(
        (page: number, total: number) => {
            if (total < 10) {
                return filterPages([1, 2, 3, 4, 5, 6, 7, 8, 9])
            } else {
                if (page % 5 >= 0 && page > 4 && page + 2 < total) {
                    return [1, page - 1, page, page + 1, total]
                } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
                    return [1, total - 3, total - 2, total - 1, total]
                } else {
                    return [1, 2, 3, 4, 5, total]
                }
            }
        },
        [filterPages]
    )

    /**
     * handle page change
     * @param page - current page
     * @returns
     */
    const changePage = (page: number) => {
        const activePage = currentPage

        if (page === activePage) {
            return
        }

        const visiblePages = getVisiblePages(page, pageCount)
        setVisiblePages(filterPages(visiblePages))
        onChange(page)
    }

    useEffect(() => {
        const visiblePages = getVisiblePages(0, pageCount)
        setVisiblePages(visiblePages)
    }, [pageCount, getVisiblePages])

    const [visiblePages, setVisiblePages] = useState<number[]>(getVisiblePages(0, pageCount))
    const activePage: number = currentPage
    return (
        <div className="d-lg-flex align-items-center text-center pb-1">
            <ul className="pagination pagination-rounded d-inline-flex ms-auto align-item-center mb-0">
                <li
                    key="prevpage"
                    className={classNames('page-item', 'paginate_button', 'previous', {
                        disabled: activePage === 1,
                    })}
                    onClick={() => {
                        if (activePage === 1) return
                        changePage(activePage - 1)
                    }}
                >
                    <Link to="#" className="page-link">
                        <i className="mdi mdi-chevron-left"></i>
                    </Link>
                </li>
                {(visiblePages || []).map((page, index, array) => {
                    return array[index - 1] + 1 < page ? (
                        <React.Fragment key={page.toString()}>
                            <li className="page-item disabled d-none d-xl-inline-block">
                                <Link to="#" className="page-link">
                                    ...
                                </Link>
                            </li>
                            <li
                                className={classNames('page-item', 'd-none', 'd-xl-inline-block', {
                                    active: activePage === page,
                                })}
                                onClick={(e) => changePage(page)}
                            >
                                <Link to="#" className="page-link">
                                    {page}
                                </Link>
                            </li>
                        </React.Fragment>
                    ) : (
                        <li
                            key={page.toString()}
                            className={classNames('page-item', 'd-none', 'd-xl-inline-block', {
                                active: activePage === page,
                            })}
                            onClick={(e) => changePage(page)}
                        >
                            <Link to="#" className="page-link">
                                {page}
                            </Link>
                        </li>
                    )
                })}
                <li
                    key="nextpage"
                    className={classNames('page-item', 'paginate_button', 'next', {
                        disabled: activePage === pageCount,
                    })}
                    onClick={() => {
                        if (activePage === pageCount) return
                        changePage(activePage + 1)
                    }}
                >
                    <Link to="#" className="page-link">
                        <i className="mdi mdi-chevron-right"></i>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export { CustomPagination }
