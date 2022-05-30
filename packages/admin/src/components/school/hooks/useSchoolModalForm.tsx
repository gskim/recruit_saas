import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export type SchoolModalFormData = {
    id?: number
    name?: string
    category1?: string
    category2?: string
}

export default function useSchoolModalForm() {
    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required('필수 항목입니다'),
            category1: yup.string().required('필수 항목입니다'),
            category2: yup.string().required('필수 항목입니다'),
        })
    )

    /*
     * form methods
     */
    const methods = useForm<SchoolModalFormData>({ resolver: schemaResolver })
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        setValue,
        clearErrors,
    } = methods

    return {
        handleSubmit,
        register,
        control,
        errors,
        setValue,
        clearErrors,
    }
}
