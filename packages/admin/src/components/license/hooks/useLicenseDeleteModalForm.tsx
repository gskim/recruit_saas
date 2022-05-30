import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export type LicenseDeleteModalFormData = {
    id: number
}

export default function useLicenseDeleteModalForm() {
    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(yup.object().shape({}))

    /*
     * form methods
     */
    const methods = useForm<LicenseDeleteModalFormData>({ resolver: schemaResolver })
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        setValue,
    } = methods

    return {
        handleSubmit,
        register,
        control,
        errors,
        setValue,
    }
}
