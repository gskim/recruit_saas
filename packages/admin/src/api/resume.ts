import {
    GetResumesDetailActivitiesResponse,
    GetResumesDetailAwardsResponse,
    GetResumesDetailCareersResponse,
    GetResumesDetailDescriptionsResponse,
    GetResumesDetailEducationsResponse,
    GetResumesDetailLanguageLevelsResponse,
    GetResumesDetailLanguageTestsResponse,
    GetResumesDetailLicensesResponse,
    GetResumesDetailLinksResponse,
    GetResumesDetailProjectsResponse,
    GetResumesDetailResponse,
    GetResumesRequest,
    GetResumesResponse,
    PostResumesDetailCommonRequest,
    PostResumesDetailDescriptionsRequest,
    PostResumesDetailRequest,
    PostResumesRequest,
    PostResumesResponse,
    PutResumesRequest,
} from '@recruit/interface'
import { APICore } from './apiCore'

const api = new APICore()

export async function resumeList(params: GetResumesRequest) {
    const baseUrl = 'resumes'
    const result = await api.get<GetResumesResponse, null>(`${baseUrl}`, params)
    return result.data
}

export async function createResume(params: PostResumesRequest) {
    const baseUrl = `resumes`
    const result = await api.create<PostResumesResponse, null>(`${baseUrl}`, params)
    return result.data
}

export async function updateResume(id: number, params: PutResumesRequest) {
    const baseUrl = `resumes/${id}`
    const result = await api.update<boolean, null>(`${baseUrl}`, params)
    return result.data
}

export async function upsertResumeDetail(id: number, params: PostResumesDetailRequest) {
    const baseUrl = `resumes/${id}`
    const result = await api.create<boolean, null>(`${baseUrl}`, params)
    return result.data
}

export async function upsertResumeDescription(
    id: number,
    params: PostResumesDetailCommonRequest<PostResumesDetailDescriptionsRequest>
) {
    const baseUrl = `resumes/${id}/descriptions`
    const result = await api.create<boolean, null>(`${baseUrl}`, params)
    return result.data
}

export async function getResumeLicenses(id: number) {
    const baseUrl = `resumes/${id}/licenses`
    const result = await api.get<GetResumesDetailLicensesResponse, null>(`${baseUrl}`, null)
    return result.data
}

export async function getResumeDescriptions(id: number) {
    const baseUrl = `resumes/${id}/descriptions`
    const result = await api.get<GetResumesDetailDescriptionsResponse, null>(`${baseUrl}`, null)
    return result.data
}

export async function getResumeLanguageTests(id: number) {
    const baseUrl = `resumes/${id}/language_tests`
    const result = await api.get<GetResumesDetailLanguageTestsResponse, null>(`${baseUrl}`, null)
    return result.data
}

export async function getResumeLanguageLevels(id: number) {
    const baseUrl = `resumes/${id}/language_levels`
    const result = await api.get<GetResumesDetailLanguageLevelsResponse, null>(`${baseUrl}`, null)
    return result.data
}

export async function getResumeActivities(id: number) {
    const baseUrl = `resumes/${id}/activities`
    const result = await api.get<GetResumesDetailActivitiesResponse, null>(`${baseUrl}`, null)
    return result.data
}

export async function getResumeCareers(id: number) {
    const baseUrl = `resumes/${id}/careers`
    const result = await api.get<GetResumesDetailCareersResponse, null>(`${baseUrl}`, null)
    return result.data
}

export async function getResumeProjects(id: number) {
    const baseUrl = `resumes/${id}/projects`
    const result = await api.get<GetResumesDetailProjectsResponse, null>(`${baseUrl}`, null)
    return result.data
}

export async function getResumeLinks(id: number) {
    const baseUrl = `resumes/${id}/links`
    const result = await api.get<GetResumesDetailLinksResponse, null>(`${baseUrl}`, null)
    return result.data
}

export async function getResumeEducations(id: number) {
    const baseUrl = `resumes/${id}/educations`
    const result = await api.get<GetResumesDetailEducationsResponse, null>(`${baseUrl}`, null)
    return result.data
}

export async function getResumeAwards(id: number) {
    const baseUrl = `resumes/${id}/awards`
    const result = await api.get<GetResumesDetailAwardsResponse, null>(`${baseUrl}`, null)
    return result.data
}

export async function getResume(id: number) {
    const baseUrl = `resumes/${id}`
    const result = await api.get<GetResumesDetailResponse, null>(`${baseUrl}`, null)
    return result.data
}
