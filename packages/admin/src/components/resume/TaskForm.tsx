import { FormInput } from 'components/form'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { Control, FieldErrors, useFieldArray } from 'react-hook-form'

interface TaskFormProps {
    careerIdx: number
    errors?: FieldErrors
    control: Control<any>
    register?: any
}

const TaskForm = ({ careerIdx, register, errors, control }: TaskFormProps) => {
    const { fields, append, remove } = useFieldArray({ name: `careers.${careerIdx}.tasks`, control })
    return (
        <>
            {fields.map((task, idx) => {
                return (
                    <div key={task.id}>
                        <div className="border p-3 mb-2 rounded" style={{ backgroundColor: 'rgb(242, 244, 246)' }}>
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <FormInput
                                        name={`careers.${careerIdx}.tasks.${idx}.id`}
                                        type="hidden"
                                        register={register}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormInput
                                        required
                                        name={`careers.${careerIdx}.tasks.${idx}.title`}
                                        label="주요업무"
                                        register={register}
                                        errors={errors}
                                        control={control}
                                    />
                                </Col>
                                <Col xl={6}>
                                    <Form.Group>
                                        <Form.Label>{'ㅤ'}</Form.Label>
                                        <InputGroup>
                                        <Button variant={'outline-secondary'} onClick={() => remove(idx)}>
                                                    제거
                                                </Button>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xl={12}>
                                    <FormInput
                                        required
                                        style={{ height: '100px' }}
                                        type="textarea"
                                        name={`careers.${careerIdx}.tasks.${idx}.description`}
                                        label="상세 설명"
                                        register={register}
                                        errors={errors}
                                        control={control}
                                    />
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
                            title: null,
                            description: null,
                        })
                    }
                >
                    프로젝트 추가
                </Button>
            </div>
        </>
    )
}

export default TaskForm
