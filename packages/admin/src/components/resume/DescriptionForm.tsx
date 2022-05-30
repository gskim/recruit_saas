import { FormInput } from 'components/form'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { Control, FieldErrors, useFieldArray } from 'react-hook-form'

interface DescriptionFormProps {
    errors?: FieldErrors
    control: Control<any>
    register?: any
}

const DescriptionForm = ({ register, errors, control }: DescriptionFormProps) => {
    const { fields, append, remove } = useFieldArray({ name: `descriptions`, control })

    return (
        <>
            {fields.map((description, idx) => {
                return (
                    <div key={description.id}>
                        <div className="border p-3 mb-2 rounded">
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <FormInput
                                        required
                                        label="제목"
                                        name={`descriptions.${idx}.title`}
                                        control={control}
                                        register={register}
                                        errors={errors}
                                    />
                                </Col>
                                <Col xl={6}>
                                    <Form.Group>
                                        <Form.Label>ㅤ</Form.Label>
                                        <InputGroup>
                                        <Button variant={'outline-secondary'} onClick={() => remove(idx)}>
                                                    제거
                                                </Button>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={12}>
                                    <FormInput
                                        required
                                        style={{ height: 250 }}
                                        type={'textarea'}
                                        label="내용"
                                        name={`descriptions.${idx}.content`}
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
                            content: null,
                        })
                    }
                >
                    기술서 추가
                </Button>
            </div>
        </>
    )
}

export default DescriptionForm
