export * from './AuthModel'
export * from './AdminModel'
export * from './ErrorCode'
export * from './CompanyModel'
export * from './EmployeeModel'
export * from './JobCategoryModel'
export * from './UserModel'
export * from './SubscribeModel'
export * from './SkillModel'
export * from './JobPostModel'
export * from './RecruitModel'
export * from './ResumeModel'
export * from './FileModel'
export * from './LicenseModel'
export * from './SchoolModel'

export interface CommonResponse<T, E> {
	data: T | null
	error: {
		code: E
		message: string
	} | null
}