import { linkTypeOptions } from 'appConstants/options'
import { FormSelect } from 'components/form'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { Control, FieldErrors, useFieldArray, UseFormSetValue } from 'react-hook-form'
import LinkAndFileInput from './LinkAndFileInput'

interface LinkFormProps {
    errors?: FieldErrors
    control: Control<any>
    register?: any
    setValue: UseFormSetValue<any>
}

const LinkForm = ({ register, errors, control, setValue }: LinkFormProps) => {
    const { fields, append, remove } = useFieldArray({ name: `links`, control })

    return (
        <>
            {fields.map((link, idx) => {
                return (
                    <div key={link.id}>
                        <div className="border p-3 mb-2 rounded">
                            <Row className="mb-2">
                                <Col xl={6}>
                                    <FormSelect
                                        required
                                        isMulti={false}
                                        label="구분"
                                        options={linkTypeOptions}
                                        name={`links.${idx}.type`}
                                        control={control}
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
                            <LinkAndFileInput
                                link={link}
                                idx={idx}
                                control={control}
                                register={register}
                                errors={errors}
                                setValue={setValue}
                            />
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
                            url: null,
                            original_name: null,
                            key: null,
                        })
                    }
                >
                    링크 및 파일 추가
                </Button>
            </div>
        </>
    )
}

export default LinkForm
