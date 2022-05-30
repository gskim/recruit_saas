import { Spinner } from 'components'
import { useQuery } from 'react-query'
import { useEffect, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { JobCategoryModel } from '@recruit/interface'
import { Link } from 'react-router-dom'
import { createJobCategory, deleteJobCategory, jobCategoryList, updateJobCategory } from 'api'
import { Button, Form, ListGroup } from 'react-bootstrap'

interface JobCategoryListGruopProps {
    parentId?: number | null
    depth: number
    select: (id: number) => void
}

const editClick = async (id: number, name: string, callback: () => void) => {
    const { data } = await updateJobCategory(id, { name })
    if (data.error) {
        console.error(data.error)
        alert(data.error.message)
    } else {
        alert('처리되었습니다')
        callback()
    }
}

const deleteClick = async (id: number, callback: () => void) => {
    const { data } = await deleteJobCategory(id)
    if (data.error) {
        console.error(data.error)
        alert(data.error.message)
    } else {
        alert('처리되었습니다')
        callback()
    }
}

const addClick = async (name: string, parentId: number | null, callback: () => void) => {
    const { data } = await createJobCategory({ name, parent_id: parentId })
    if (data.error) {
        console.error(data.error)
        alert(data.error.message)
    } else {
        alert('등록되었습니다')
        callback()
    }
}

const JobCategoryListGroup = ({ parentId, depth, select }: JobCategoryListGruopProps) => {
    const [selectId, setSelectedId] = useState<number | null>(null)
    const [editableId, setEditableId] = useState<number | null>(null)
    const [addable, setAddable] = useState<boolean>(false)
    const textInput = useRef<HTMLInputElement>(null)
    const addTextInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setSelectedId(selectId)
    }, [selectId])

    useEffect(() => {
        setAddable(false)
    }, [parentId])

    const {
        isLoading,
        error: _error,
        data,
        refetch,
    } = useQuery(JSON.stringify({ url: 'jobCategories', parentId }), async () => {
        if (depth > 0 && !parentId) {
            return [] as JobCategoryModel[]
        } else {
            const result = await jobCategoryList({ parent_id: parentId || undefined })
            if (result.data.data) {
                return result.data.data.item_list
            } else {
                console.error(result.data.error)
                throw new Error(result.data.error?.message)
            }
        }
    })

    const saveBtnClick = () => {
        if (editableId && textInput.current && textInput.current.value && textInput.current.value.trim() !== '') {
            editClick(editableId, textInput.current.value, () => {
                setEditableId(null)
                setSelectedId(null)
                refetch()
            })
        } else {
            alert('입력값이 없습니다')
        }
    }

    const addBtnClick = () => {
        if (!parentId && depth !== 0) {
            alert('상위 직무를 선택해주세요')
            return false
        }
        if (addable && addTextInput.current && addTextInput.current.value && addTextInput.current.value.trim() !== '') {
            addClick(addTextInput.current.value, parentId || null, () => {
                setAddable(false)
                refetch()
            })
        } else {
            alert('입력값이 없습니다')
        }
    }

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

    return (
        <ListGroup>
            {data!.map((item) => {
                return (
                    <ListGroup.Item
                        active={item.id === selectId}
                        key={item.id}
                        className="d-flex justify-content-between align-items-center"
                    >
                        {item.id === editableId ? (
                            <div className="d-flex justify-content-between align-items-center">
                                <Form.Control
                                    className="me-2"
                                    style={{ width: 200 }}
                                    ref={textInput}
                                    type="text"
                                    name="name"
                                    defaultValue={item.name}
                                />
                                <Link to="#" className="font-18 text-warning me-2" onClick={saveBtnClick}>
                                    <i className="uil uil-check"></i>
                                </Link>
                                <Link to="#" className="font-18 text-danger me-2" onClick={() => setEditableId(null)}>
                                    <i className="uil uil-times"></i>
                                </Link>
                            </div>
                        ) : (
                            item.name
                        )}
                        <div>
                            <Link
                                to="#"
                                className="font-18 text-info me-2"
                                onClick={() => {
                                    setEditableId(item.id)
                                }}
                            >
                                <i className="uil uil-pen"></i>
                            </Link>
                            <Link
                                to="#"
                                className="font-18 text-danger me-2"
                                onClick={() => {
                                    deleteClick(item.id, () => {
                                        refetch()
                                    })
                                }}
                            >
                                <i className="uil uil-trash"></i>
                            </Link>
                            {depth < 2 && (
                                <Link
                                    to="#"
                                    className="font-18 text-warning"
                                    onClick={() => {
                                        setSelectedId(item.id)
                                        select(item.id)
                                    }}
                                >
                                    <i className="uil uil-arrow-right"></i>
                                </Link>
                            )}
                        </div>
                    </ListGroup.Item>
                )
            })}
            <ListGroup.Item>
                {addable ? (
                    <div className="d-flex justify-content-between align-items-center">
                        <Form.Control
                            className="me-2"
                            style={{ width: 200 }}
                            ref={addTextInput}
                            type="text"
                            name="name"
                        />
                        <Link to="#" className="font-18 text-warning me-2" onClick={addBtnClick}>
                            <i className="uil uil-check"></i>
                        </Link>
                        <Link to="#" className="font-18 text-danger me-2" onClick={() => setAddable(false)}>
                            <i className="uil uil-times"></i>
                        </Link>
                    </div>
                ) : (
                    <div className="d-grid">
                        <Button variant="info" onClick={() => setAddable(true)}>
                            추가
                        </Button>
                    </div>
                )}
            </ListGroup.Item>
        </ListGroup>
    )
}

export default JobCategoryListGroup
