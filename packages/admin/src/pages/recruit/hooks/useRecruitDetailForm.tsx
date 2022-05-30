import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { CommonOption, JobPostSearchOption, ResumeSearchOption } from 'appConstants/options'
import { RecruitProcess, RecruitStatus } from '@recruit/interface'


export type RecruitDetailFormData = {
    title: string
    description: string | null
    status: CommonOption<RecruitStatus>
    process: CommonOption<RecruitProcess>
    resume: ResumeSearchOption
    jobPost: JobPostSearchOption
}

export default function useRecruitDetailForm(defaultValues?: RecruitDetailFormData) {
    const schemaResolver = yupResolver(
        yup.object().shape({
            title: yup.string().required('필수항목입니다'),
        })
    )

    const methods = useForm<RecruitDetailFormData>({ resolver: schemaResolver, defaultValues })
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
