import LanguageLevelGradeSelect from 'components/form/LanguageLevelGradeSelect'
import LanguageLevelTypeSelect from 'components/form/LanguageLevelTypeSelect'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { Control, FieldErrors, useFieldArray } from 'react-hook-form'

interface LanguageLevelFormProps {
    errors?: FieldErrors
    control: Control<any>
    register?: any
}

const LanguageLevelForm = ({ register, errors, control }: LanguageLevelFormProps) => {
    const { fields, append, remove } = useFieldArray({ name: `language_levels`, control })
    return (
        <>
            {fields.map((language_test, idx) => {
                return (
                    <div key={language_test.id}>
                        <div className="border p-3 mb-2 rounded">
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <Form.Group>
                                        <Form.Label>언어명<span style={{ color: 'red' }}> *</span></Form.Label>
                                        <LanguageLevelTypeSelect
                                            name={`language_levels.${idx}.type`}
                                            control={control}
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
                                    <Form.Group>
                                        <Form.Label>수준<span style={{ color: 'red' }}> *</span></Form.Label>
                                        <LanguageLevelGradeSelect
                                            name={`language_levels.${idx}.grade`}
                                            control={control}
                                        />
                                    </Form.Group>
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
                    외국어 능력 수준 추가
                </Button>
            </div>
        </>
    )
}

export default LanguageLevelForm
