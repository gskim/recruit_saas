import {
    GetSkillsDetailErrorCode,
    GetSkillsDetailResponse,
    GetSkillsRequest,
    GetSkillsResponse,
    PostSkillsDetailImageRequest,
    PostSkillsDetailImageResponse,
    PostSkillsErrorCode,
    PostSkillsRequest,
    PutSkillsDetailErrorCode,
    PutSkillsDetailRequest,
} from '@recruit/interface'
import { APICore } from './apiCore'

const api = new APICore()

export function skills(params: GetSkillsRequest) {
    const baseUrl = 'skills'
    return api.get<GetSkillsResponse, null>(`${baseUrl}`, params)
}

export function skillDetail(id: number) {
    const baseUrl = `skills/${id}`
    return api.get<GetSkillsDetailResponse, GetSkillsDetailErrorCode>(`${baseUrl}`, null)
}

export function createSkill(params: PostSkillsRequest) {
    const baseUrl = `skills`
    return api.create<boolean, PostSkillsErrorCode>(`${baseUrl}`, params)
}

export function modifiedSkill(id: number, params: PutSkillsDetailRequest) {
    const baseUrl = `skills/${id}`
    return api.update<boolean, PutSkillsDetailErrorCode>(`${baseUrl}`, params)
}

export function deleteSkill(id: number) {
    const baseUrl = `skills/${id}`
    return api.delete<boolean, null>(`${baseUrl}`)
}

export function skillImagePresignedUrl(params: PostSkillsDetailImageRequest) {
    const baseUrl = `skills/image`
    return api.create<PostSkillsDetailImageResponse, null>(`${baseUrl}`, params)
}
