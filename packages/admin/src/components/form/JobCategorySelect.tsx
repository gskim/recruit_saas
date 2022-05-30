import { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import Select from 'react-select'
import useJobCategoryList from './hooks/useJobCategoryList'

interface JobCategorySelectProps {
    depth1Name: string
    depth2Name: string
    depth3Name: string
    errors?: FieldErrors
    control: Control<any>
    className?: string
    labelClassName?: string
    containerClass?: string
    depth1Value?: { label: string; value: number }
    depth2Value?: { label: string; value: number }
    required?: boolean
}

const JobCategorySelect = ({
    depth1Name,
    depth2Name,
    depth3Name,
    control,
    errors,
    className,
    labelClassName,
    containerClass,
    depth1Value,
    depth2Value,
    required
}: JobCategorySelectProps) => {
    const [depth1, setDepth1] = useState<{ value: number; label: string } | null>(depth1Value || null)
    const [depth2, setDepth2] = useState<{ value: number; label: string } | null>(depth2Value || null)
    const [depth3, setDepth3] = useState<{ value: number; label: string }[] | null>(null)

    const { data: depth1Data } = useJobCategoryList({ depth: 0 })
    const { data: depth2Data, refetch: depth2Refetch } = useJobCategoryList({
        parentId: depth1?.value || undefined,
        depth: 1,
    })
    const { data: depth3Data, refetch: depth3Refetch } = useJobCategoryList({
        parentId: depth2?.value || undefined,
        depth: 2,
    })

    useEffect(() => {
        depth2Refetch()
        depth3Refetch()
        // setDepth2(null)
        // setDepth3(null)
    }, [depth1])

    useEffect(() => {
        depth3Refetch()
        // setDepth3(null)
    }, [depth2])

    return (
        <Row>
            <Col lg={4}>
                <Form.Group className={containerClass}>
                    <Form.Label className={labelClassName}>
                        직무1{required && <span style={{ color: 'red' }}> *</span>}
                    </Form.Label>
                    <Controller
                        name={depth1Name}
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                value={field.value}
                                onChange={(value) => {
                                    setDepth1(value)
                                    field.onChange(value)
                                }}
                                className={className}
                                isClearable
                                isMulti={false}
                                classNamePrefix="react-select"
                                options={depth1Data?.map((data) => {
                                    return { value: data.id, label: data.name }
                                })}
                            />
                        )}
                    />
                    {errors && errors[depth1Name] ? (
                        <Form.Control.Feedback type="invalid">{errors[depth1Name]['message']}</Form.Control.Feedback>
                    ) : null}
                </Form.Group>
            </Col>
            <Col lg={4}>
                <Form.Group className={containerClass}>
                    <Form.Label className={labelClassName}>
                        직무2{required && <span style={{ color: 'red' }}> *</span>}
                    </Form.Label>
                    <Controller
                        name={depth2Name}
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                onChange={(value) => {
                                    setDepth2(value)
                                    field.onChange(value)
                                }}
                                value={field.value}
                                className={className}
                                isClearable
                                isMulti={false}
                                classNamePrefix="react-select"
                                options={depth2Data?.map((data) => {
                                    return { value: data.id, label: data.name }
                                })}
                            />
                        )}
                    />
                    {errors && errors[depth2Name] ? (
                        <Form.Control.Feedback type="invalid">{errors[depth2Name]['message']}</Form.Control.Feedback>
                    ) : null}
                </Form.Group>
            </Col>
            <Col lg={4}>
                <Form.Group className={containerClass}>
                    <Form.Label className={labelClassName}>
                        직무3{required && <span style={{ color: 'red' }}> *</span>}
                    </Form.Label>
                    <Controller
                        name={depth3Name}
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                value={field.value}
                                onChange={(value) => {
                                    setDepth3(value.map((data) => data))
                                    field.onChange(value)
                                }}
                                isClearable
                                className={className}
                                isMulti={true}
                                classNamePrefix="react-select"
                                options={depth3Data?.map((data) => {
                                    return { value: data.id, label: data.name }
                                })}
                            />
                        )}
                    />
                    {errors && errors[depth3Name] ? (
                        <Form.Control.Feedback type="invalid">{errors[depth3Name]['message']}</Form.Control.Feedback>
                    ) : null}
                </Form.Group>
            </Col>
        </Row>
    )
}

export default JobCategorySelect
