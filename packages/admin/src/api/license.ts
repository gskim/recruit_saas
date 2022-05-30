import {
    GetLicensesRequest,
    GetLicensesResponse,
    PostLicensesErrorCode,
    PostLicensesRequest,
    PutLicensesDetailRequest,
    PutLicensesErrorCode,
} from '@recruit/interface'
import { APICore } from './apiCore'

const api = new APICore()

export function licenseList(params: GetLicensesRequest) {
    const baseUrl = 'licenses'
    return api.get<GetLicensesResponse, null>(`${baseUrl}`, params)
}

export function createLicense(params: PostLicensesRequest) {
    const baseUrl = `licenses`
    return api.create<boolean, PostLicensesErrorCode>(`${baseUrl}`, params)
}

export function updateLicense(id: number, params: PutLicensesDetailRequest) {
    const baseUrl = `licenses/${id}`
    return api.update<boolean, PutLicensesErrorCode>(`${baseUrl}`, params)
}

export function deleteLicense(id: number) {
    const baseUrl = `licenses/${id}`
    return api.delete<boolean, null>(`${baseUrl}`)
}
