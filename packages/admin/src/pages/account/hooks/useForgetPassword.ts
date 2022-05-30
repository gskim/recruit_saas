import { useEffect } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { resetAuth, forgotPassword } from 'redux/actions'
import { useRedux } from 'hooks'
import { UserData } from '../ForgetPassword'

export default function useForgetPassword() {
    const { dispatch, appSelector } = useRedux()
    useEffect(() => {
        dispatch(resetAuth())
    }, [dispatch])

    const { loading, passwordReset, resetPasswordSuccess, error } = appSelector((state) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        passwordReset: state.Auth.passwordReset,
        resetPasswordSuccess: state.Auth.resetPasswordSuccess,
    }))

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            username: yup.string().required('Please enter Username'),
        })
    )

    /*
     * handle form submission
     */
    const onSubmit = (formData: UserData) => {
        dispatch(forgotPassword(formData['username']))
    }

    return {
        loading,
        passwordReset,
        resetPasswordSuccess,
        error,
        schemaResolver,
        onSubmit,
    }
}
