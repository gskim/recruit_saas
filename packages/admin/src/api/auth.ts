import {
    AuthsLoginErrorCode,
    AuthsSignupErrorCode,
    PostAuthsLoginRequest,
    PostAuthsLoginResponse,
    PostAuthsSignupRequest,
} from '@recruit/interface'
import { APICore } from './apiCore'

const api = new APICore()

export function menus() {
    const baseUrl = 'auths/menu/'
    return api.get<any, AuthsLoginErrorCode>(`${baseUrl}`, null)
}

export function login(params: PostAuthsLoginRequest) {
    const baseUrl = 'auths/login/'
    return api.create<PostAuthsLoginResponse, AuthsLoginErrorCode>(`${baseUrl}`, params)
}

export function logout() {
    const baseUrl = 'auths/logout/'
    return api.create(`${baseUrl}`, {})
}

export function signup(params: PostAuthsSignupRequest) {
    const baseUrl = 'auths/signup/'
    return api.create<boolean, AuthsSignupErrorCode>(`${baseUrl}`, params)
}

export function forgotPassword(params: { email: string }) {
    const baseUrl = 'auths/forget-password/'
    return api.create(`${baseUrl}`, params)
}

export function forgotPasswordConfirm(params: { email: string }) {
    const baseUrl = 'auths/password/reset/confirm/'
    return api.create(`${baseUrl}`, params)
}
