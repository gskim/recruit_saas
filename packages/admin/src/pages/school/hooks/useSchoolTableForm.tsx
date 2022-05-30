import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export type SchoolFormData = {
    name?: string
    category1?: string
    category2?: string
}

export default function useSchoolTableForm() {
    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            // name: yup.string().required('Please enter Project Name'),
        })
    )

    /*
     * form methods
     */
    const methods = useForm<SchoolFormData>({ resolver: schemaResolver })
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
