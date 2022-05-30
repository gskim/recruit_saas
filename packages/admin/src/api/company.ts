import {
    GetCompaniesDetailErrorCode,
    GetCompaniesDetailResponse,
    GetCompaniesRequest,
    GetCompaniesResponse,
    PostCompaniesDetailLogoImageRequest,
    PostCompaniesDetailLogoImageResponse,
    PostCompaniesRequest,
    PutCompaniesDetailRequest,
} from '@recruit/interface'
import { APICore } from './apiCore'

const api = new APICore()

export function companyList(params: GetCompaniesRequest) {
    const baseUrl = 'companies'
    return api.get<GetCompaniesResponse, null>(`${baseUrl}`, params)
}

export function companyDetail(id: number) {
    const baseUrl = `companies/${id}`
    return api.get<GetCompaniesDetailResponse, GetCompaniesDetailErrorCode>(`${baseUrl}`, null)
}

export function createCompany(params: PostCompaniesRequest) {
    const baseUrl = `companies`
    return api.create<boolean, null>(`${baseUrl}`, params)
}

export function updateCompany(id: number, params: PutCompaniesDetailRequest) {
    const baseUrl = `companies/${id}`
    return api.update<boolean, null>(`${baseUrl}`, params)
}

export function companyLogoImagePresignedUrl(params: PostCompaniesDetailLogoImageRequest) {
    const baseUrl = `companies/logo_img_presigned_url`
    return api.create<PostCompaniesDetailLogoImageResponse, null>(`${baseUrl}`, params)
}
