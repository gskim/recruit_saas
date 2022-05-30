import {
    GetJobPostsDetailErrorCode,
    GetJobPostsDetailResponse,
    GetJobPostsRequest,
    GetJobPostsResponse,
    PostJobPostsErrorCode,
    PostJobPostsRequest,
    PutJobPostsDetailErrorCode,
    PutJobPostsDetailRequest,
} from '@recruit/interface'
import { APICore } from './apiCore'

const api = new APICore()

export async function jobPosts(params: GetJobPostsRequest) {
    const baseUrl = 'job_posts'
    const result = await api.get<GetJobPostsResponse, null>(`${baseUrl}`, params)
    return result.data
}

export async function jobPostDetail(id: number) {
    const baseUrl = `job_posts/${id}`
    const result = await api.get<GetJobPostsDetailResponse, GetJobPostsDetailErrorCode>(`${baseUrl}`, null)
    return result.data
}

export async function createJobPost(params: PostJobPostsRequest) {
    const baseUrl = `job_posts`
    const result = await api.create<boolean, PostJobPostsErrorCode>(`${baseUrl}`, params)
    return result.data
}

export async function updateJobPost(id: number, params: PutJobPostsDetailRequest) {
    const baseUrl = `job_posts/${id}`
    const result = await api.update<boolean, PutJobPostsDetailErrorCode>(`${baseUrl}`, params)
    return result.data
}
