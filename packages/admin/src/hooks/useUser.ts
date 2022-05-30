import { AdminModel } from '@recruit/interface'
import { APICore } from 'api/apiCore'

export default function useUser(): { user: AdminModel; token: string }[] {
    const api = new APICore()

    const loggedInUser = api.getLoggedInUser()
    return [loggedInUser]
}
