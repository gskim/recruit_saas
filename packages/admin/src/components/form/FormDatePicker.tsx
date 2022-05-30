import { Form } from 'react-bootstrap'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import classNames from 'classnames'

interface FormDatePickerProps {
    required?: boolean
    label?: string
    name: string
    placeholder?: string
    errors?: FieldErrors
    control?: Control<any>
    register?: any
    className?: string
}

const FormDatePicker = ({ required, label, name, errors, control, register, className }: FormDatePickerProps) => {
    const output = (date: Date | null) => {
        return date ? date.valueOf() : null
    }
    return (
        <Form.Group className={className}>
            {label && (
                <Form.Label>
                    {label}
                    {required && <span style={{ color: 'red' }}> *</span>}
                </Form.Label>
            )}
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <DatePicker
                        locale={'ko'}
                        className={classNames('form-control', className)}
                        selected={field.value}
                        onChange={(date) => {
                            field.onChange(output(date))
                        }}
                        dateFormat={'yyyy-MM-dd'}
                        autoComplete="off"
                    />
                )}
            />
        </Form.Group>
    )
}

export default FormDatePicker
