import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SkillCategoryOption } from 'appConstants/options'

export type SkillDetailFormData = {
    name: string
    image_key: string | null
    alias: string
    description: string | null
    website_url: string | null
    skill_category: SkillCategoryOption
}

export default function useSkillsDetailForm() {
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required('필수항목입니다'),
        })
    )

    const methods = useForm<SkillDetailFormData>({ resolver: schemaResolver })
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
