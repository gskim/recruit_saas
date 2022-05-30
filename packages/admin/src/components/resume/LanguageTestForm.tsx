import { FormInput } from 'components/form'
import FormDatePicker from 'components/form/FormDatePicker'
import LanguageTestTypeSelect from 'components/form/LanguageTestTypeSelect'
import LicenseSearchInput from 'components/form/LicenseSearchInput'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { Control, FieldErrors, useFieldArray } from 'react-hook-form'

interface LanguageTestFormProps {
    errors?: FieldErrors
    control: Control<any>
    register?: any
}

const LanguageTestForm = ({ register, errors, control }: LanguageTestFormProps) => {
    const { fields, append, remove } = useFieldArray({ name: `language_tests`, control })
    return (
        <>
            {fields.map((language_test, idx) => {
                return (
                    <div key={language_test.id}>
                        <div className="border p-3 mb-2 rounded">
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <Form.Group>
                                        <Form.Label>종류<span style={{ color: 'red' }}> *</span></Form.Label>
                                        <LanguageTestTypeSelect name={`language_tests.${idx}.type`} control={control} />
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
                                        name={`language_tests.${idx}.score`}
                                        label="점수"
                                        register={register}
                                        errors={errors}
                                        control={control}
                                    />
                                </Col>
                                <Col xl={6}>
                                    <FormDatePicker
                                        required
                                        label="일자"
                                        name={`language_tests.${idx}.applied_at`}
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
                            type: null,
                            score: null,
                            applied_at: null,
                        })
                    }
                >
                    외국어 능력 시험 추가
                </Button>
            </div>
        </>
    )
}

export default LanguageTestForm
