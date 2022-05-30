import React, { SelectHTMLAttributes } from 'react'
import { Form } from 'react-bootstrap'
import { FieldErrors, Control, Controller } from 'react-hook-form'

type FormInputNumberProps = SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string
    type?: string
    name: string
    register?: any
    errors?: FieldErrors
    control?: Control<any>
    className?: string
    labelClassName?: string
    containerClass?: string
}

const FormInputNumber = ({
    label,
    name,
    register,
    errors,
    control,
    className,
    labelClassName,
    containerClass,
    children,
    required,
    ...otherProps
}: FormInputNumberProps) => {
    const output = (e: React.ChangeEvent<any>) => {
        const output = parseInt(e.target.value, 10)
        return isNaN(output) ? null : output
    }

    return (
        <Form.Group className={containerClass}>
            {label ? <Form.Label className={labelClassName}>{label}{required && <span style={{ color: 'red' }}> *</span>}</Form.Label> : null}
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Form.Control
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(output(e))}
                        className={className}
                    />
                )}
            />
            {errors && errors[name] ? (
                <Form.Control.Feedback type="invalid">{errors[name]['message']}</Form.Control.Feedback>
            ) : null}
        </Form.Group>
    )
}

export default FormInputNumber
