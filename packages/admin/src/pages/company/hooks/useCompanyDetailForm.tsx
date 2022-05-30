import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export type CompanyDetailFormData = {
    name_ko: string
    name_en: string
    email: string | null
    tel: string | null
    address: string
    logo_img_url: string | null
}

export default function useCompanyDetailForm() {
    const schemaResolver = yupResolver(
        yup.object().shape({
            name_ko: yup.string().required('필수항목입니다'),
            name_en: yup.string().required('필수항목입니다'),
        })
    )

    const methods = useForm<CompanyDetailFormData>({ resolver: schemaResolver })
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
