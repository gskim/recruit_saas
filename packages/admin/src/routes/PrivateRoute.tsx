import { Navigate, useLocation } from 'react-router-dom'
import { APICore } from 'api/apiCore'
import { useUser } from 'hooks'
import { AdminRole } from '@recruit/interface'

type PrivateRouteProps = {
    component: React.ComponentType
    roles?: AdminRole
}

/**
 * Private Route forces the authorization before the route can be accessed
 * @param {*} param0
 * @returns
 */
const PrivateRoute = ({ component: RouteComponent, roles, ...rest }: PrivateRouteProps) => {
    let location = useLocation()
    const [loggedInUser] = useUser()

    const api = new APICore()

    /**
     * not logged in so redirect to login page with the return url
     */
    if (api.isUserAuthenticated() === false) {
        return <Navigate to={'/account/login'} state={{ from: location }} replace />
    }
    // check if route is restricted by role
    // if (roles && loggedInUser.user.roles.indexOf(roles) === -1) {
    //     return <Navigate to={{ pathname: '/' }} />
    // }

    return <RouteComponent />
}

export default PrivateRoute
