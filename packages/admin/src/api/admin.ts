import {
    GetAdminsDetailErrorCode,
    GetAdminsDetailResponse,
    GetAdminsRequest,
    GetAdminsResponse,
    PostAdminsDetailProfileImageRequest,
    PostAdminsDetailProfileImageResponse,
    PutAdminsDetailErrorCode,
    PutAdminsDetailRequest,
} from '@recruit/interface'
import { APICore } from './apiCore'

const api = new APICore()

export function admins(params: GetAdminsRequest) {
    const baseUrl = 'admins'
    return api.get<GetAdminsResponse, null>(`${baseUrl}`, params)
}

export function adminDetail(id: number) {
    const baseUrl = `admins/${id}`
    return api.get<GetAdminsDetailResponse, GetAdminsDetailErrorCode>(`${baseUrl}`, null)
}

export function adminProfileImagePresignedUrl(id: number, params: PostAdminsDetailProfileImageRequest) {
    const baseUrl = `admins/${id}/profile_image`
    return api.create<PostAdminsDetailProfileImageResponse, null>(`${baseUrl}`, params)
}

export function modifiedAdmin(id: number, params: PutAdminsDetailRequest) {
    const baseUrl = `admins/${id}`
    return api.update<boolean, PutAdminsDetailErrorCode>(`${baseUrl}`, params)
}
