import { FormInput } from 'components/form'
import FormDatePicker from 'components/form/FormDatePicker'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { Control, FieldErrors, useFieldArray } from 'react-hook-form'
import TaskForm from './TaskForm'

interface CareerFormProps {
    errors?: FieldErrors
    control: Control<any>
    register?: any
}

const CareerForm = ({ register, errors, control }: CareerFormProps) => {
    const { fields, append, remove } = useFieldArray({ name: `careers`, control })
    return (
        <>
            {fields.map((career, idx) => {
                return (
                    <div key={career.id}>
                        <div className="border p-3 mb-2 rounded">
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <FormInput
                                        name={`careers.${idx}.id`}
                                        type="hidden"
                                        register={register}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormInput
                                        required
                                        name={`careers.${idx}.company_name`}
                                        label="회사명"
                                        register={register}
                                        errors={errors}
                                        control={control}
                                    />
                                </Col>
                                <Col xl={6}>
                                    <Form.Group>
                                        <Form.Label>ㅤ</Form.Label>
                                        <InputGroup>
                                        <Button
                                                    variant={'outline-secondary'}
                                                    className="me-2"
                                                    onClick={() => remove(idx)}
                                                >
                                                    제거
                                                </Button>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <FormInput
                                        required
                                        name={`careers.${idx}.organization`}
                                        label="부서명"
                                        register={register}
                                        errors={errors}
                                        control={control}
                                    />
                                </Col>
                                <Col xl={6}>
                                    <FormInput
                                        required
                                        name={`careers.${idx}.charge`}
                                        label="직책"
                                        register={register}
                                        errors={errors}
                                        control={control}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <FormDatePicker
                                        required
                                        label="시작일"
                                        name={`careers.${idx}.started_at`}
                                        register={register}
                                        errors={errors}
                                        control={control}
                                    />
                                </Col>
                                <Col xl={6}>
                                    <FormDatePicker
                                        label="종료일"
                                        name={`careers.${idx}.ended_at`}
                                        register={register}
                                        errors={errors}
                                        control={control}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={{ span: 10, offset: 1 }}>
                                    <TaskForm careerIdx={idx} register={register} errors={errors} control={control} />
                                </Col>
                            </Row>
                        </div>
                    </div>
                )
            })}
            <div className="d-grid">
                <Button
                    variant={'outline-secondary'}
                    onClick={() =>
                        append({
                            id: null,
                            company_name: null,
                            organization: null,
                            charge: null,
                            started_at: null,
                            ended_at: null,
                        })
                    }
                >
                    경력 추가
                </Button>
            </div>
        </>
    )
}

export default CareerForm
