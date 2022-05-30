export enum AuthsSignupErrorCode {
	EXIST_EMAIL = 'EXIST_EMAIL',
}

export enum AuthsLoginErrorCode {
	DELETE_USER = 'DELETE_USER',
	NOT_APPROVE = 'NOT_APPROVE',
	NOT_EXIST_EMAIL = 'NOT_EXIST_EMAIL',
	WRONG_PASSWORD = 'WRONG_PASSWORD',
}

export enum GetAdminsDetailErrorCode {
	NOT_FOUND = 'NOT_FOUND',
}

export enum PutAdminsDetailErrorCode {
	NOT_FOUND = 'NOT_FOUND',
}

export enum GetCompaniesDetailErrorCode {
	NOT_FOUND = 'NOT_FOUND',
}

export enum GetEmployeesDetailErrorCode {
	NOT_FOUND = 'NOT_FOUND',
}

export enum PostEmployeesErrorCode {
	NOT_FOUND_COMPANY = 'NOT_FOUND_COMPANY',
	EXIST_EMAIL = 'EXIST_EMAIL',
}

export enum PostJobCategoriesErrorCode {
	NOT_FOUND_PARENT = 'NOT_FOUND_PARENT'
}

export enum GetJobCategoriesDetailErrorCode {
	NOT_FOUND = 'NOT_FOUND'
}

export enum GetUsersDetailErrorCode {
	NOT_FOUND = 'NOT_FOUND'
}

export enum PutUsersDetailJobCategoriesErrorCode {
	NOT_FOUND_USER = 'NOT_FOUND_USER',
	NOT_FOUND_JOB_CATEGORY = 'NOT_FOUND_JOB_CATEGORY',
}

export enum PostSubscribesErrorCode {
	NOT_FOUND_COMPANY = 'NOT_FOUND_COMPANY',
	NOT_FOUND_SUBSCRIBE_POLICY = 'NOT_FOUND_SUBSCRIBE_POLICY',
	WRONG_DATE = 'WRONG_DATE',
}

export enum PutSubscribesDetailErrorCode {
	NOT_FOUND_COMPANY = 'NOT_FOUND_COMPANY',
	NOT_FOUND_SUBSCRIBE_POLICY = 'NOT_FOUND_SUBSCRIBE_POLICY',
	WRONG_DATE = 'WRONG_DATE',
}

export enum GetSubscribesDetailErrorCode {
	NOT_FOUND = 'NOT_FOUND',
}

export enum GetSkillsDetailErrorCode {
	NOT_FOUND = 'NOT_FOUND',
}

export enum PostSkillsErrorCode {
	NOT_FOUND_SKILL_CATEGORY = 'NOT_FOUND_SKILL_CATEGORY',
	EXIST_SKILL = 'EXIST_SKILL',
}

export enum PutSkillsDetailErrorCode {
	NOT_FOUND_SKILL_CATEGORY = 'NOT_FOUND_SKILL_CATEGORY',
}

export enum PostSkillCategoriesErrorCode {
	EXIST_SKILL_CATEGORY = 'EXIST_SKILL_CATEGORY'
}

export enum PostJobPostsErrorCode {
	NOT_FOUND_COMPANY = 'NOT_FOUND_COMPANY',
	NOT_FOUND_JOB_CATEGORY = 'NOT_FOUND_JOB_CATEGORY',
	NOT_FOUND_SKILL = 'NOT_FOUND_SKILL',
	WRONG_DATE = 'WRONG_DATE',
}

export enum PutJobPostsDetailErrorCode {
	NOT_FOUND_JOB_CATEGORY = 'NOT_FOUND_JOB_CATEGORY',
	NOT_FOUND_SKILL = 'NOT_FOUND_SKILL',
	WRONG_DATE = 'WRONG_DATE',
}

export enum GetJobPostsDetailErrorCode {
	NOT_FOUND = 'NOT_FOUND',
}

export enum GetRecruitsDetailErrorCode {
	NOT_FOUND = 'NOT_FOUND',
}

export enum PostRecruitsErrorCode {
	NOT_FOUND_RESUME = 'NOT_FOUND_RESUME',
	NOT_FOUND_JOB_POST = 'NOT_FOUND_JOB_POST',
}

export enum PostSchoolsErrorCode {
	EXIST_SCHOOL = 'EXIST_SCHOOL',
}

export enum PutSchoolsErrorCode {
	EXIST_SCHOOL = 'EXIST_SCHOOL',
}

export enum PostLicensesErrorCode {
	EXIST_LICENSE = 'EXIST_LICENSE',
}

export enum PutLicensesErrorCode {
	EXIST_LICENSE = 'EXIST_LICENSE',
}