import { Row, Col, Card, Button } from 'react-bootstrap'
import { FormInput, PageTitle } from 'components'
import { useState } from 'react'

import SchoolTable from 'components/school/SchoolTable'
import useSchoolTableForm, { SchoolFormData } from 'pages/school/hooks/useSchoolTableForm'
import { useToggle } from 'hooks'
import SchoolModal from 'components/school/SchoolModal'
import SchoolDeleteModal from 'components/school/SchoolDeleteModal'

const SchoolList = () => {
    const [isOpen, toggleModal] = useToggle()
    const [deleteModalIsOpen, deleteToggleModal] = useToggle()
    const [modalData, setModalData] = useState<
        { id: number; category1: string; name: string; category2: string } | undefined
    >()
    const [deleteId, setDeleteId] = useState<number>(0)
    const { handleSubmit, control, register } = useSchoolTableForm()
    const [filter, setFilter] = useState<SchoolFormData>({})
    const onSubmit = (value: SchoolFormData) => {
        setFilter({
            name: value.name,
            category1: value.category1,
            category2: value.category2,
        })
    }

    return (
        <>
            <SchoolModal
                show={isOpen}
                onHide={toggleModal}
                onCreate={(data) => {
                    toggleModal()
                }}
                onUpdate={(data) => {
                    toggleModal()
                }}
                id={modalData?.id}
                name={modalData?.name}
                category1={modalData?.category1}
                category2={modalData?.category2}
            />
            <SchoolDeleteModal
                show={deleteModalIsOpen}
                onHide={deleteToggleModal}
                id={deleteId}
                onDelete={(data) => {
                    deleteToggleModal()
                }}
            />
            <PageTitle
                breadCrumbItems={[{ label: '대학교 목록', path: '/schools', active: true }]}
                title={'대학교 목록'}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Row className="mb-2">
                                    <Col sm={5}>
                                        <Button
                                            className="mb-2"
                                            variant="danger"
                                            onClick={() => {
                                                setModalData(undefined)
                                                toggleModal()
                                            }}
                                        >
                                            <i className="mdi mdi-plus-circle me-2"></i> 대학교 추가
                                        </Button>
                                    </Col>
                                    <Col sm={7}>
                                        <div className="text-sm-end">
                                            <Button variant="light" className="mb-2">
                                                Export
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col xl={3}>
                                        <div className="row gy-2 gx-2 align-items-center justify-content-xl-start justify-content-between">
                                            <div className="col-auto">
                                                <div className="d-flex align-items-center w-auto">
                                                    <label className="me-2">대학명</label>
                                                    <FormInput
                                                        type="text"
                                                        name="name"
                                                        className="form-control chat-input"
                                                        register={register}
                                                        key="name"
                                                        control={control}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xl={3}>
                                        <div className="row gy-2 gx-2 align-items-center justify-content-xl-start justify-content-between">
                                            <div className="col-auto">
                                                <div className="d-flex align-items-center w-auto">
                                                    <label className="me-2">구분1</label>
                                                    <FormInput
                                                        type="text"
                                                        name="category1"
                                                        className="form-control chat-input"
                                                        register={register}
                                                        key="category1"
                                                        control={control}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xl={3}>
                                        <div className="row gy-2 gx-2 align-items-center justify-content-xl-start justify-content-between">
                                            <div className="col-auto">
                                                <div className="d-flex align-items-center w-auto">
                                                    <label className="me-2">구분2</label>
                                                    <FormInput
                                                        type="text"
                                                        name="category2"
                                                        className="form-control chat-input"
                                                        register={register}
                                                        key="category2"
                                                        control={control}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xl={{ span: 1, offset: 2 }}>
                                        <div className="text-sm-end">
                                            <Button type="submit">조회</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </form>
                            <SchoolTable
                                name={filter.name}
                                category1={filter.category1}
                                category2={filter.category2}
                                edit={(id, name, category1, category2) => {
                                    setModalData({ id, name, category1, category2 })
                                    toggleModal()
                                }}
                                remove={(id) => {
                                    setDeleteId(id)
                                    deleteToggleModal()
                                }}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default SchoolList
