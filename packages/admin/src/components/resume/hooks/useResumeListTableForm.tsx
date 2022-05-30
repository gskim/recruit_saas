import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ResumeEducationType, ResumeLanguageLevelType } from '@recruit/interface'
import { CommonOption, LicenseSearchOption, SchoolSearchOption } from 'appConstants/options'

export type ResumeListFormData = {
    username?: string
    email?: string
    companyName?: string
    skillList?: { label: string; value: number }[]
    depth1JobCategory?: { label: string; value: number }
    depth2JobCategory?: { label: string; value: number }
    depth3JobCategoryList?: { label: string; value: number }[]
    educationLastType?: CommonOption<ResumeEducationType>
    license?: LicenseSearchOption
    school?: SchoolSearchOption
    languageLevelType?: CommonOption<ResumeLanguageLevelType>
    languageLevelGrade?: CommonOption<string>
}

export default function useResumeTableForm() {
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
    const methods = useForm<ResumeListFormData>({ resolver: schemaResolver })
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
