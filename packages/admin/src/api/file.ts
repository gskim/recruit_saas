import { PostFilesUploadRequest, PostFilesUploadResponse } from '@recruit/interface'
import { APICore } from './apiCore'

const api = new APICore()

export function upload(params: PostFilesUploadRequest) {
    const baseUrl = 'files/upload'
    return api.create<PostFilesUploadResponse, null>(`${baseUrl}`, params)
}
