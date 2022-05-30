import {
    GetSchoolsRequest,
    GetSchoolsResponse,
    PostSchoolsErrorCode,
    PostSchoolsRequest,
    PutSchoolsDetailRequest,
    PutSchoolsErrorCode,
} from '@recruit/interface'
import { APICore } from './apiCore'

const api = new APICore()

export function schoolList(params: GetSchoolsRequest) {
    const baseUrl = 'schools'
    return api.get<GetSchoolsResponse, null>(`${baseUrl}`, params)
}

export function createSchool(params: PostSchoolsRequest) {
    const baseUrl = `schools`
    return api.create<boolean, PostSchoolsErrorCode>(`${baseUrl}`, params)
}

export function updateSchool(id: number, params: PutSchoolsDetailRequest) {
    const baseUrl = `schools/${id}`
    return api.update<boolean, PutSchoolsErrorCode>(`${baseUrl}`, params)
}

export function deleteSchool(id: number) {
    const baseUrl = `schools/${id}`
    return api.delete<boolean, null>(`${baseUrl}`)
}
