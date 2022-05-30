import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export type SchoolDeleteModalFormData = {
    id: number
}

export default function useSchoolDeleteModalForm() {
    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(yup.object().shape({}))

    /*
     * form methods
     */
    const methods = useForm<SchoolDeleteModalFormData>({ resolver: schemaResolver })
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
