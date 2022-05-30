import { Row, Col, Card, Button } from 'react-bootstrap'
import { FormInput, PageTitle } from 'components'
import SkillTable from 'components/skill/SkillTable'
import Select from 'react-select'
import useSkillsTableForm, { SkillFormData } from 'components/skill/hooks/useSkillTableForm'
import { Controller } from 'react-hook-form'
import { useState } from 'react'
import { skillCategoryOptions } from 'appConstants/options'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const SkillList = () => {
    const { statusOptions, handleSubmit, control, register } = useSkillsTableForm()
    const [filter, setFilter] = useState<any>({ skill_category_id: 1 })
    const onSubmit = (value: SkillFormData) => {
        setFilter({
            skill_category_id: value.skill_category ? value.skill_category?.value : 1,
            alias: value.alias,
        })
    }
    const addSkill = () => <Navigate to={'/skills/new'}></Navigate>
    return (
        <>
            <PageTitle
                breadCrumbItems={[{ label: '기술스택 관리', path: '/skills', active: true }]}
                title={'기술스택 관리'}
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
                                                        카테고리
                                                    </label>
                                                    <Controller
                                                        name="skill_category"
                                                        control={control}
                                                        defaultValue={skillCategoryOptions[0]}
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
                                                    <label className="me-2">기술명</label>
                                                    <FormInput
                                                        type="text"
                                                        name="alias"
                                                        className="form-control chat-input"
                                                        register={register}
                                                        key="alias"
                                                        control={control}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xl={2}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Button type="submit">조회</Button>

                                            <Link to="/skills/new">
                                                <Button variant="info">등록</Button>
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                            </form>
                            <SkillTable alias={filter.alias} skill_category_id={filter.skill_category_id} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default SkillList
