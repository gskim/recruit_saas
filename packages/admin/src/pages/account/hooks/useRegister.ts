import { useEffect } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { resetAuth } from 'redux/actions'
import { useRedux } from 'hooks'
import { useMutation } from 'react-query'
import { PostAuthsSignupRequest } from '@recruit/interface'
import { signup } from 'helpers'

export default function useRegister() {
    const { dispatch } = useRedux()
    useEffect(() => {
        dispatch(resetAuth())
    }, [dispatch])

    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required('Please enter Email').email('Please enter valid Email'),
            password: yup.string().required('Please enter Password'),
        })
    )

    const mutation = useMutation((formData: PostAuthsSignupRequest) => {
        return signup(formData)
    })

    const onSubmit = (formData: PostAuthsSignupRequest) => {
        mutation.mutate(formData)
    }
    const { isLoading, isError, data } = mutation

    return {
        isLoading,
        error: data?.data.error,
        data: data?.data.data,
        isError,
        schemaResolver,
        onSubmit,
    }
}
