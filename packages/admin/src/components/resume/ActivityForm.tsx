import { FormInput } from 'components/form'
import FormDatePicker from 'components/form/FormDatePicker'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { Control, FieldErrors, useFieldArray } from 'react-hook-form'

interface ActivityFormProps {
    errors?: FieldErrors
    control: Control<any>
    register?: any
}

const ActivityForm = ({ register, errors, control }: ActivityFormProps) => {
    const { fields, append, remove } = useFieldArray({ name: `activities`, control })

    return (
        <>
            {fields.map((activity, idx) => {
                return (
                    <div key={activity.id}>
                        <div className="border p-3 mb-2 rounded">
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <FormInput
                                        required
                                        label="활동명"
                                        name={`activities.${idx}.title`}
                                        control={control}
                                        register={register}
                                        errors={errors}
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
                                    <FormDatePicker
                                        label="시작일"
                                        required
                                        name={`activities.${idx}.started_at`}
                                        register={register}
                                        errors={errors}
                                        control={control}
                                    />
                                </Col>
                                <Col xl={6}>
                                    <FormDatePicker
                                        required
                                        label="종료일"
                                        name={`activities.${idx}.ended_at`}
                                        register={register}
                                        errors={errors}
                                        control={control}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={12}>
                                    <FormInput
                                        required
                                        type={'textarea'}
                                        label="설명"
                                        name={`activities.${idx}.description`}
                                        control={control}
                                        register={register}
                                        errors={errors}
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
                            title: null,
                            description: null,
                            started_at: null,
                            ended_at: null,
                        })
                    }
                >
                    활동 추가
                </Button>
            </div>
        </>
    )
}

export default ActivityForm
