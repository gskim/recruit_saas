import { FormInput } from 'components/form'
import FormDatePicker from 'components/form/FormDatePicker'
import LicenseSearchInput from 'components/form/LicenseSearchInput'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { Control, FieldErrors, useFieldArray, UseFormSetValue } from 'react-hook-form'

interface LicenseFormProps {
    errors?: FieldErrors
    control: Control<any>
    register?: any
    setValue: UseFormSetValue<any>
}

const LicenseForm = ({ register, errors, control, setValue }: LicenseFormProps) => {
    const { fields, append, remove } = useFieldArray({ name: `licenses`, control })
    return (
        <>
            {fields.map((license, idx) => {
                return (
                    <div key={license.id}>
                        <div className="border p-3 mb-2 rounded">
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <FormInput
                                        name={`licenses.${idx}.license_id`}
                                        type="hidden"
                                        register={register}
                                        errors={errors}
                                        control={control}
                                    />
                                    <Form.Group>
                                        <Form.Label>
                                            자격증명<span style={{ color: 'red' }}> *</span>
                                        </Form.Label>
                                        <LicenseSearchInput
                                            id={'license_search' + idx}
                                            name={`licenses.${idx}.name`}
                                            control={control}
                                            onChange={(v) => {
                                                if (v) {
                                                    setValue(`licenses.${idx}.license_id`, v.value)
                                                }
                                            }}
                                        />
                                    </Form.Group>
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
                                        name={`licenses.${idx}.organization`}
                                        label="발급기관"
                                        register={register}
                                        errors={errors}
                                        control={control}
                                    />
                                </Col>
                                <Col xl={6}>
                                    <FormDatePicker
                                        required
                                        label="취득일"
                                        name={`licenses.${idx}.applied_at`}
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
                            started_at: null,
                            ended_at: null,
                        })
                    }
                >
                    자격증 추가
                </Button>
            </div>
        </>
    )
}

export default LicenseForm
