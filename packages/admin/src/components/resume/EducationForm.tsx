import { educationStatusOptions, educationTypeOptions } from 'appConstants/options'
import { FormInput, FormSelect } from 'components/form'
import FormDatePicker from 'components/form/FormDatePicker'
import SchoolSearchInput from 'components/form/SchoolSearchInput'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { Control, FieldErrors, useFieldArray, UseFormSetValue } from 'react-hook-form'

interface EducationFormProps {
    errors?: FieldErrors
    control: Control<any>
    register?: any
    setValue: UseFormSetValue<any>
}

const EducationForm = ({ register, errors, control, setValue }: EducationFormProps) => {
    const { fields, append, remove } = useFieldArray({ name: `educations`, control })

    return (
        <>
            {fields.map((education, idx) => {
                return (
                    <div key={education.id}>
                        <div className="border p-3 mb-2 rounded">
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <FormSelect
                                        required
                                        label="종류"
                                        name={`educations.${idx}.type`}
                                        control={control}
                                        options={educationTypeOptions}
                                        isMulti={false}
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
                                    <Form.Group>
                                        <Form.Label>기관명<span style={{ color: 'red' }}> *</span></Form.Label>
                                        <FormInput
                                            name={`educations.${idx}.target_id`}
                                            type="hidden"
                                            register={register}
                                            errors={errors}
                                            control={control}
                                        />
                                        <SchoolSearchInput
                                            id={'educations_search' + idx}
                                            name={`educations.${idx}.name`}
                                            control={control}
                                            onChange={(v) => {
                                                if (v) {
                                                    setValue(`educations.${idx}.target_id`, v.value)
                                                }
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xl={6}>
                                    <FormSelect
                                        required
                                        label="상태"
                                        name={`educations.${idx}.status`}
                                        control={control}
                                        options={educationStatusOptions}
                                        isMulti={false}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xl={4}>
                                    <FormInput
                                        label="전공"
                                        name={`educations.${idx}.major`}
                                        control={control}
                                        register={register}
                                        errors={errors}
                                    />
                                </Col>
                                <Col xl={4}>
                                    <FormDatePicker
                                        required
                                        label="시작일"
                                        name={`educations.${idx}.started_at`}
                                        register={register}
                                        errors={errors}
                                        control={control}
                                    />
                                </Col>
                                <Col xl={4}>
                                    <FormDatePicker
                                        label="종료일"
                                        name={`educations.${idx}.ended_at`}
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
                            status: null,
                            type: null,
                            target_id: null,
                            name: null,
                            started_at: null,
                            ended_at: null,
                            major: null,
                            score: null,
                        })
                    }
                >
                    교육 추가
                </Button>
            </div>
        </>
    )
}

export default EducationForm
