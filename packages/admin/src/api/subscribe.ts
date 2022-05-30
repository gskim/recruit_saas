import {
    GetSubscribesDetailErrorCode,
    GetSubscribesDetailResponse,
    GetSubscribesRequest,
    GetSubscribesResponse,
    PostSubscribesErrorCode,
    PostSubscribesRequest,
    PutSubscribesDetailErrorCode,
    PutSubscribesRequest,
} from '@recruit/interface'
import { APICore } from './apiCore'

const api = new APICore()

export function subscribes(params: GetSubscribesRequest) {
    const baseUrl = 'subscribes'
    return api.get<GetSubscribesResponse, null>(`${baseUrl}`, params)
}

export function getSubscribe(id: number) {
    const baseUrl = `subscribes/${id}`
    return api.get<GetSubscribesDetailResponse, GetSubscribesDetailErrorCode>(`${baseUrl}`, null)
}

export function createSubscribe(params: PostSubscribesRequest) {
    const baseUrl = `subscribes`
    return api.create<boolean, PostSubscribesErrorCode>(`${baseUrl}`, params)
}

export function modifySubscribe(id: number, params: PutSubscribesRequest) {
    const baseUrl = `subscribes/${id}`
    return api.update<boolean, PutSubscribesDetailErrorCode>(`${baseUrl}`, params)
}
