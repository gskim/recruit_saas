import {
    GetRecruitsDetailErrorCode,
    GetRecruitsDetailResponse,
    GetRecruitsRequest,
    GetRecruitsResponse,
    PostRecruitsErrorCode,
    PostRecruitsRequest,
    PostRecruitsResponse,
    PutRecruitsDetailDescriptionRequest,
    PutRecruitsDetailProcessRequest,
    PutRecruitsDetailRequest,
    PutRecruitsDetailStatusRequest,
} from '@recruit/interface'
import { APICore } from './apiCore'

const api = new APICore()

export async function recruitList(params: GetRecruitsRequest) {
    const baseUrl = 'recruits'
    const result = await api.get<GetRecruitsResponse, null>(`${baseUrl}`, params)
    return result.data
}

export async function createRecruit(params: PostRecruitsRequest) {
    const baseUrl = `recruits`
    const result = await api.create<PostRecruitsResponse, PostRecruitsErrorCode>(`${baseUrl}`, params)
    return result.data
}

export async function updateRecruit(id: number, params: PutRecruitsDetailRequest) {
    const baseUrl = `recruits/${id}`
    const result = await api.update<boolean, null>(`${baseUrl}`, params)
    return result.data
}

export async function updateRecruitDescription(id: number, params: PutRecruitsDetailDescriptionRequest) {
    const baseUrl = `recruits/${id}/description`
    const result = await api.update<boolean, null>(`${baseUrl}`, params)
    return result.data
}

export async function updateRecruitStatus(id: number, params: PutRecruitsDetailStatusRequest) {
    const baseUrl = `recruits/${id}/status`
    const result = await api.update<boolean, null>(`${baseUrl}`, params)
    return result.data
}

export async function updateRecruitProcess(id: number, params: PutRecruitsDetailProcessRequest) {
    const baseUrl = `recruits/${id}/process`
    const result = await api.update<boolean, null>(`${baseUrl}`, params)
    return result.data
}

export async function getRecruit(id: number) {
    const baseUrl = `recruits/${id}`
    const result = await api.get<GetRecruitsDetailResponse, GetRecruitsDetailErrorCode>(`${baseUrl}`, null)
    return result.data
}
