import DaumPostModal from 'components/DaumPostModal'
import { useToggle } from 'hooks'
import { InputHTMLAttributes, useState } from 'react'
import { Form } from 'react-bootstrap'
import { FieldErrors, Control } from 'react-hook-form'

type FormAddressProps = InputHTMLAttributes<HTMLInputElement> & {
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

const FormAddress = ({
    label,
    name,
    register,
    errors,
    control,
    className,
    labelClassName,
    containerClass,
    children,
    ...otherProps
}: FormAddressProps) => {
    const [show, onHide] = useToggle()
    const [address, setAddress] = useState<string | null>(null)

    return (
        <Form.Group className={containerClass}>
            {label ? <Form.Label className={labelClassName}>{label}</Form.Label> : null}
            <Form.Control
                onClick={onHide}
                value={address || undefined}
                type="text"
                name={name}
                id={name}
                className={className}
                isInvalid={errors && errors[name] ? true : false}
                {...(register ? register(name) : {})}
                {...otherProps}
                autoComplete={name}
            >
                {children ? children : null}
            </Form.Control>

            {errors && errors[name] ? (
                <Form.Control.Feedback type="invalid">{errors[name]['message']}</Form.Control.Feedback>
            ) : null}
            <DaumPostModal show={show} onHide={onHide} setAddress={setAddress} />
            {/* <Button  >주소 입력</Button> */}
        </Form.Group>
    )
}

export default FormAddress
