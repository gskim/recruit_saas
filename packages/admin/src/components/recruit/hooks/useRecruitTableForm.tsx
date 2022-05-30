import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { CommonOption, CompanySearchOption } from 'appConstants/options'
import { RecruitProcess, RecruitStatus } from '@recruit/interface'

export type RecruitFormData = {
    company?: CompanySearchOption
    user_email?: string
    process?: CommonOption<RecruitProcess>
    status?: CommonOption<RecruitStatus>
    title?: string
}

export default function useRecruitTableForm() {
    const schemaResolver = yupResolver(
        yup.object().shape({
            // name: yup.string().required('Please enter Project Name'),
        })
    )

    const methods = useForm<RecruitFormData>({ resolver: schemaResolver })
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
