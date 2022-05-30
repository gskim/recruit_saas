import {
    GetEmployeesDetailErrorCode,
    GetEmployeesDetailResponse,
    GetEmployeesRequest,
    GetEmployeesResponse,
    PostEmployeesErrorCode,
    PostEmployeesRequest,
    PutEmployeesDetailRequest,
} from '@recruit/interface'
import { APICore } from './apiCore'

const api = new APICore()

export function employees(params: GetEmployeesRequest) {
    const baseUrl = 'employees'
    return api.get<GetEmployeesResponse, null>(`${baseUrl}`, params)
}

export function getEmployee(id: number) {
    const baseUrl = `employees/${id}`
    return api.get<GetEmployeesDetailResponse, GetEmployeesDetailErrorCode>(`${baseUrl}`, null)
}

export function createEmployee(params: PostEmployeesRequest) {
    const baseUrl = `employees`
    return api.create<boolean, PostEmployeesErrorCode>(`${baseUrl}`, params)
}

export function modifyEmployee(id: number, params: PutEmployeesDetailRequest) {
    const baseUrl = `employees/${id}`
    return api.update<boolean, null>(`${baseUrl}`, params)
}

export function deleteEmployee(id: number) {
    const baseUrl = `employees/${id}`
    return api.delete<boolean, null>(`${baseUrl}`)
}
