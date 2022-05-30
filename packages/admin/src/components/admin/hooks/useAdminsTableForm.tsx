import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AdminStatusOption, adminStatusOptions } from 'appConstants/options'

export type AdminsFormData = {
    status?: AdminStatusOption
    email?: string
    nickname?: string
}

export default function useAdminsTableForm() {
    const [statusOptions] = useState<AdminStatusOption[]>(adminStatusOptions)

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
    const methods = useForm<AdminsFormData>({ resolver: schemaResolver })
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
