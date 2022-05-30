import {
    GetJobCategoriesRequest,
    GetJobCategoriesResponse,
    PostJobCategoriesErrorCode,
    PostJobCategoriesRequest,
    PutJobCategoriesDetailRequest,
} from '@recruit/interface'
import { APICore } from './apiCore'

const api = new APICore()

export function jobCategoryList(params: GetJobCategoriesRequest) {
    const baseUrl = 'job_categories'
    return api.get<GetJobCategoriesResponse, null>(`${baseUrl}`, params)
}

export function createJobCategory(params: PostJobCategoriesRequest) {
    const baseUrl = `job_categories`
    return api.create<boolean, PostJobCategoriesErrorCode>(`${baseUrl}`, params)
}

export function updateJobCategory(id: number, params: PutJobCategoriesDetailRequest) {
    const baseUrl = `job_categories/${id}`
    return api.update<boolean, null>(`${baseUrl}`, params)
}

export function deleteJobCategory(id: number) {
    const baseUrl = `job_categories/${id}`
    return api.delete<boolean, null>(`${baseUrl}`)
}
