import { FormInput } from 'components/form'
import FormDatePicker from 'components/form/FormDatePicker'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { Control, FieldErrors, useFieldArray } from 'react-hook-form'

interface AwardFormProps {
    errors?: FieldErrors
    control: Control<any>
    register?: any
}

const AwardForm = ({ register, errors, control }: AwardFormProps) => {
    const { fields, append, remove } = useFieldArray({ name: `awards`, control })

    return (
        <>
            {fields.map((award, idx) => {
                return (
                    <div key={award.id}>
                        <div className="border p-3 mb-2 rounded">
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <FormInput
                                        required
                                        label="수상명"
                                        name={`awards.${idx}.title`}
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
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <FormDatePicker
                                        required
                                        label="수상일"
                                        name={`awards.${idx}.dated_at`}
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
                                        name={`awards.${idx}.description`}
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
                            dated_at: null,
                        })
                    }
                >
                    수상 추가
                </Button>
            </div>
        </>
    )
}

export default AwardForm
