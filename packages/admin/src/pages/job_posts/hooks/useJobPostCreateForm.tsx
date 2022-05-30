import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { CommonOption, CompanySearchOption } from 'appConstants/options'
import {
    CareerType,
    JobPostFileRequest,
    JobPostProcess,
    JobPostStatus,
    JobPostTerminatedReason,
    ResumeEducationType,
} from '@recruit/interface'
import { SkillSearchOption } from 'components/form/SkillSearchInput'

export type JobPostCreateFormData = {
    title: string
    description: string
    terminatedReason: CommonOption<JobPostTerminatedReason>
    careerType: CommonOption<CareerType>
    careerPeriod: number
    status: CommonOption<JobPostStatus>
    startedAt: number
    endedAt: number | null
    linkUrl: string
    company: CompanySearchOption
    memo: string | null
    skillList: SkillSearchOption[]
    minEducationType: CommonOption<ResumeEducationType> | null
    depth1JobCategory: { value: number; label: string }
    depth2JobCategory: { value: number; label: string }
    depth3JobCategoryList: { value: number; label: string }[]
    minAge: number | null
    maxAge: number | null
    minAnnualIncome: number | null
    maxAnnualIncome: number | null
    workPlace: string | null
    process: CommonOption<JobPostProcess>[]
    charge: string | null
    files: JobPostFileRequest[]
}

export default function useJobPostCreateForm(defaultValues?: JobPostCreateFormData) {
    const schemaResolver = yupResolver(
        yup.object().shape({
            // startedAt: yup.number().required('필수항목입니다'),
        })
    )

    const methods = useForm<JobPostCreateFormData>({ resolver: schemaResolver, defaultValues })
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
