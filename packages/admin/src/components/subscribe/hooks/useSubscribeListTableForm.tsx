import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { CompanySearchOption } from 'appConstants/options'

export type SubscribeListFormData = {
    company?: CompanySearchOption
}

export default function useEmployeeTableForm() {
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
    const methods = useForm<SubscribeListFormData>({ resolver: schemaResolver })
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
