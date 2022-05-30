import { Row, Col, Card, Button } from 'react-bootstrap'
import { FormInput, PageTitle } from 'components'
import AdminsTable from 'components/admin/AdminsTable'
import Select from 'react-select'
import useAdminsTableForm, { AdminsFormData } from 'components/admin/hooks/useAdminsTableForm'
import { Controller } from 'react-hook-form'
import { useState } from 'react'

const Admins = () => {
    const { statusOptions, handleSubmit, control, register } = useAdminsTableForm()
    const [filter, setFilter] = useState<any>({})
    const onSubmit = (value: AdminsFormData) => {
        setFilter({
            status: value.status?.value,
            email: value.email,
            nickname: value.nickname,
        })
    }

    return (
        <>
            <PageTitle
                breadCrumbItems={[{ label: '관리자 관리', path: '/admins', active: true }]}
                title={'관리자 관리'}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Row className="mb-2">
                                    <Col xl={3}>
                                        <div className="row gy-2 gx-2 align-items-center justify-content-xl-start justify-content-between">
                                            <div className="col-auto">
                                                <div className="d-flex align-items-center w-auto">
                                                    <label htmlFor="status-select" className="me-2">
                                                        상태
                                                    </label>
                                                    <Controller
                                                        name="status"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Select
                                                                styles={{
                                                                    control: (styles) => ({
                                                                        ...styles,
                                                                        width: '200px',
                                                                    }),
                                                                }}
                                                                className="react-select"
                                                                classNamePrefix="react-select"
                                                                {...field}
                                                                isClearable
                                                                options={statusOptions}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col xl={3}>
                                        <div className="row gy-2 gx-2 align-items-center justify-content-xl-start justify-content-between">
                                            <div className="col-auto">
                                                <div className="d-flex align-items-center w-auto">
                                                    <label className="me-2">이메일</label>
                                                    <FormInput
                                                        type="text"
                                                        name="email"
                                                        className="form-control chat-input"
                                                        register={register}
                                                        key="email"
                                                        control={control}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xl={3}>
                                        <div className="col-auto">
                                            <div className="d-flex align-items-center w-auto">
                                                <label className="me-2">닉네임</label>
                                                <FormInput
                                                    type="text"
                                                    name="nickname"
                                                    className="form-control chat-input"
                                                    register={register}
                                                    key="nickname"
                                                    control={control}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xl={{ span: 1, offset: 2 }}>
                                        <div className="col-auto">
                                            <Button type="submit">조회</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </form>
                            <AdminsTable status={filter.status} email={filter.email} nickname={filter.nickname} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Admins
