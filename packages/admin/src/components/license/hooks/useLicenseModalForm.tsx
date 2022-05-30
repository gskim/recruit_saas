import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export type LicenseModalFormData = {
    id?: number
    name?: string
    type?: string
    organization?: string
}

export default function useLicenseModalForm() {
    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required('필수 항목입니다'),
            type: yup.string().required('필수 항목입니다'),
            organization: yup.string().required('필수 항목입니다'),
        })
    )

    /*
     * form methods
     */
    const methods = useForm<LicenseModalFormData>({ resolver: schemaResolver })
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        setValue,
        clearErrors,
    } = methods

    return {
        clearErrors,
        handleSubmit,
        register,
        control,
        errors,
        setValue,
    }
}
