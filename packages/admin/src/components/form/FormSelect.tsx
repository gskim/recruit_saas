import { SelectHTMLAttributes } from 'react'
import { Form } from 'react-bootstrap'
import { FieldErrors, Control, Controller } from 'react-hook-form'
import Select from 'react-select'

type FormSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string
    name: string
    register?: any
    errors?: FieldErrors
    control?: Control<any>
    className?: string
    labelClassName?: string
    containerClass?: string
    options: any[]
    defaultSelect?: any
    isMulti: boolean
    isClearable?: boolean
}

const FormSelect = ({
    label,
    name,
    register,
    errors,
    control,
    className,
    labelClassName,
    containerClass,
    options,
    disabled,
    defaultSelect,
    isMulti,
    required,
    isClearable,
    ...otherProps
}: FormSelectProps) => {
    return (
        <Form.Group className={containerClass}>
            {label ? (
                <Form.Label className={labelClassName}>
                    {label}
                    {required && <span style={{ color: 'red' }}> *</span>}
                </Form.Label>
            ) : null}
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <>
                        <Select
                            isClearable={isClearable}
                            className={className}
                            defaultValue={defaultSelect}
                            isDisabled={disabled}
                            isMulti={isMulti}
                            classNamePrefix="react-select"
                            options={options}
                            {...(register ? register(name) : {})}
                            {...field}
                            {...otherProps}
                        />
                    </>
                )}
            />
            {errors && errors[name] ? (
                <Form.Control.Feedback type="invalid">{errors[name]['message']}</Form.Control.Feedback>
            ) : null}
        </Form.Group>
    )
}

export default FormSelect
