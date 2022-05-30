import { useEffect } from 'react'
import { Location, useLocation } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { resetAuth, loginUser } from 'redux/actions'
import { useRedux } from 'hooks'
import { UserData } from '../Login'

type LocationState = {
    from?: Location
}

export default function useLogin() {
    const { dispatch, appSelector } = useRedux()

    const location: Location = useLocation()
    let redirectUrl: string = '/'

    if (location.state) {
        const { from } = location.state as LocationState
        redirectUrl = from ? from.pathname : '/'
    }

    useEffect(() => {
        dispatch(resetAuth())
    }, [dispatch])

    const { loading, userLoggedIn, user, error } = appSelector((state) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
    }))

    /*
    form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required('Please enter Email'),
            password: yup.string().required('Please enter Password'),
        })
    )

    /*
    handle form submission
    */
    const onSubmit = (formData: UserData) => {
        dispatch(loginUser(formData['email'], formData['password']))
    }

    return {
        loading,
        userLoggedIn,
        user,
        error,
        schemaResolver,
        onSubmit,
        redirectUrl,
    }
}
