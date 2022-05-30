import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { CommonOption, LicenseSearchOption, SchoolSearchOption } from 'appConstants/options'
import {
    ResumeEducationStatus,
    ResumeEducationType,
    ResumeLanguageLevelType,
    ResumeLanguageTestType,
    ResumeLinkType,
} from '@recruit/interface'

export type ResumeFormData = {
    id: number | null
    name: string
    title: string
    email: string
    birthday: string | null
    gender: CommonOption<string>
    address: string | null
    phone: string | null
    profileImage: string | null
    depth1JobCategory: { value: number; label: string }
    depth2JobCategory: { value: number; label: string }
    depth3JobCategoryList: { value: number; label: string }[]
    skillList: { value: number; label: string }[]
    annualIncome: number | null
    licenses: LicenseFormData[]
    careers: CareerFormData[]
    language_tests: LanguageTestFormData[]
    language_levels: LanguageLevelFormData[]
    descriptions: DescriptionFormData[]
    educations: EducationFormData[]
    awards: AwardFormData[]
    activities: ActivityFormData[]
    projects: ProjectFormData[]
    links: LinkFormData[]
}

type LicenseFormData = {
    name: LicenseSearchOption
    license_id: number | null
    organization: string
    applied_at: number
}

type CareerFormData = {
    id: number | null
    company_name: string
    company_description: string | null
    organization: string
    charge: string
    started_at: number
    ended_at: number | null
    tasks: CareerTaskFormData[]
}

type CareerTaskFormData = {
    id: number | null
    title: string
    description: string
}

type LanguageTestFormData = {
    type: CommonOption<ResumeLanguageTestType>
    score: string
    applied_at: number
}

type LanguageLevelFormData = {
    type: CommonOption<ResumeLanguageLevelType>
    grade: CommonOption<string>
}

type DescriptionFormData = {
    id: number | null
    title: string
    content: string
}

type EducationFormData = {
    status: CommonOption<ResumeEducationStatus>
    type: CommonOption<ResumeEducationType>
    target_id: number | null
    name: SchoolSearchOption
    started_at: number
    ended_at: number | null
    major: string | null
    score: string | null
}

type AwardFormData = {
    title: string
    description: string
    dated_at: number
}

type ActivityFormData = {
    title: string
    description: string
    started_at: number
    ended_at: number
}

type ProjectFormData = {
    title: string
    description: string
    started_at: number
    ended_at: number
}

type LinkFormData = {
    type: CommonOption<ResumeLinkType>
    url: string | null
    original_name: string | null
    key: string | null
}

export default function useResumeForm(defaultValue?: ResumeFormData) {
    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            title: yup.string().required('필수 항목입니다'),
            name: yup.string().required('필수 항목입니다'),
            email: yup.string().email().required('필수 항목입니다'),
            phone: yup.string().required('필수 항목입니다'),
        })
    )

    /*
     * form methods
     */
    const methods = useForm<ResumeFormData>({ resolver: schemaResolver, defaultValues: defaultValue })
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        setValue,
        clearErrors,
    } = methods

    return {
        clearErrors,
        handleSubmit,
        register,
        control,
        errors,
        setValue,
    }
}
