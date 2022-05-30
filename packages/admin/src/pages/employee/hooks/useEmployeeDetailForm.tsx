import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { CompanySearchOption } from 'appConstants/options'

export type EmployeeDetailFormData = {
    name: string
    email: string
    phone: string
    company: CompanySearchOption
}

export default function useEmployeeDetailForm(defaultValues?: any) {
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required('필수항목입니다'),
            email: yup.string().required('필수항목입니다'),
            phone: yup.string().required('필수항목입니다'),
        })
    )

    const methods = useForm<EmployeeDetailFormData>({ resolver: schemaResolver, defaultValues })
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        setValue,
    } = methods

    return {
        setValue,
        handleSubmit,
        register,
        control,
        errors,
    }
}
