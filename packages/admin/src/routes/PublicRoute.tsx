import { Navigate, useLocation } from 'react-router-dom'
import { APICore } from 'api/apiCore'

type PrivateRouteProps = {
    component: React.ComponentType
}

/**
 * Private Route forces the authorization before the route can be accessed
 * @param {*} param0
 * @returns
 */
const PublicRoute = ({ component: RouteComponent, ...rest }: PrivateRouteProps) => {
    let location = useLocation()
    const api = new APICore()
    /**
     * not logged in so redirect to login page with the return url
     */
    if (api.isUserAuthenticated() === false) {
        return <Navigate to={'/account/login'} state={{ from: location }} replace />
    }

    return <RouteComponent />
}

export default PublicRoute
