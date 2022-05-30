import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AdminRoleOption, AdminStatusOption } from 'appConstants/options'

export type AdminDetailFormData = {
    nickname: string | null
    phone: string | null
    status: AdminStatusOption
    roles: AdminRoleOption[]
    email: string
    profile_image: string | null
}

export default function useAdminsDetailForm() {
    const schemaResolver = yupResolver(
        yup.object().shape({
            nickname: yup.string().required('필수항목입니다').max(10, '10자 이하로 입력해주세요'),
            phone: yup.string().required('필수항목입니다').max(11, '형식에 맞게 입력해주세요'),
        })
    )

    const methods = useForm<AdminDetailFormData>({ resolver: schemaResolver })
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
