import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SkillCategoryOption, skillCategoryOptions } from 'appConstants/options'
import { useState } from 'react'

export type SkillFormData = {
    alias?: string
    skill_category: SkillCategoryOption
}

export default function useSkillsTableForm() {
    const [statusOptions] = useState<SkillCategoryOption[]>(skillCategoryOptions)

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
    const methods = useForm<SkillFormData>({ resolver: schemaResolver })
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        setValue,
    } = methods

    return {
        statusOptions,
        handleSubmit,
        register,
        control,
        errors,
        setValue,
    }
}
