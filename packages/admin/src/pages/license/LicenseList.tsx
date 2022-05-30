import { Row, Col, Card, Button } from 'react-bootstrap'
import { FormInput, PageTitle } from 'components'
import { useState } from 'react'

import LicenseTable from 'components/license/LicenseTable'
import useLicenseTableForm, { LicenseFormData } from 'pages/license/hooks/useLicenseTableForm'
import { useToggle } from 'hooks'
import LicenseModal from 'components/license/LicenseModal'
import LicenseDeleteModal from 'components/license/LicenseDeleteModal'

const LicenseList = () => {
    const [isOpen, toggleModal] = useToggle()
    const [deleteModalIsOpen, deleteToggleModal] = useToggle()
    const [modalData, setModalData] = useState<
        { id: number; type: string; name: string; organization: string } | undefined
    >()
    const [deleteId, setDeleteId] = useState<number>(0)
    const { handleSubmit, control, register } = useLicenseTableForm()
    const [filter, setFilter] = useState<LicenseFormData>({})
    const onSubmit = (value: LicenseFormData) => {
        setFilter({
            name: value.name,
            type: value.type,
            organization: value.organization,
        })
    }

    return (
        <>
            <LicenseModal
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
                type={modalData?.type}
                organization={modalData?.organization}
            />
            <LicenseDeleteModal
                show={deleteModalIsOpen}
                onHide={deleteToggleModal}
                id={deleteId}
                onDelete={(data) => {
                    deleteToggleModal()
                }}
            />
            <PageTitle
                breadCrumbItems={[{ label: '자격증 목록', path: '/licenses', active: true }]}
                title={'자격증 목록'}
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
                                            <i className="mdi mdi-plus-circle me-2"></i> 자격증 추가
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
                                                    <label className="me-2">자격증명</label>
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
                                                    <label className="me-2">구분</label>
                                                    <FormInput
                                                        type="text"
                                                        name="type"
                                                        className="form-control chat-input"
                                                        register={register}
                                                        key="type"
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
                                                    <label className="me-2">조직</label>
                                                    <FormInput
                                                        type="text"
                                                        name="organization"
                                                        className="form-control chat-input"
                                                        register={register}
                                                        key="organization"
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
                            <LicenseTable
                                name={filter.name}
                                type={filter.type}
                                organization={filter.organization}
                                edit={(id, name, type, organization) => {
                                    setModalData({ id, name, type, organization })
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

export default LicenseList
