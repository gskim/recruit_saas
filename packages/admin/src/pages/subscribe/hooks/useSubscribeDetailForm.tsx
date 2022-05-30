import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { CompanySearchOption, SubscribeSearchOption } from 'appConstants/options'

export type SubscribeDetailFormData = {
    started_at: number
    ended_at: number
    price: number
    company: CompanySearchOption
    subscribe_policy: SubscribeSearchOption
    memo: string | null
}

export default function useSubscribeDetailForm(defaultValues?: any) {
    const schemaResolver = yupResolver(
        yup.object().shape({
        })
    )

    const methods = useForm<SubscribeDetailFormData>({ resolver: schemaResolver, defaultValues })
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
