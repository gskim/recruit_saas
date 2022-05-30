import { Type } from 'class-transformer'
import { IsArray, IsDefined, IsEnum, IsNumber, IsNumberString, IsOptional, IsString, MaxLength } from 'class-validator'
import { JobCategoryModel } from './JobCategoryModel'
import { SkillModel } from './SkillModel'
import { UserModel } from './UserModel'


export enum ResumeEducationStatus {
	졸업 = '졸업',
	재학중 = '재학중',
	휴학 = '휴학',
	수료 = '수료',
}

export enum ResumeEducationType {
	고등학교 = '고등학교',
	대학교 = '대학교',
	대학원 = '대학원',
	기관 = '기관',
}


export enum ResumeStatus {
	공개 = '공개',
	비공개 = '비공개',
}


export enum ResumeLanguageLevelType {
	영어 = '영어',
	일본어 = '일본어',
	중국어 = '중국어',
}

export enum ResumeLanguageTestType {
	TOEIC = 'TOEIC',
	TOEFL = 'TOEFL',
	TOEIC_SPEAKING = 'TOEIC_SPEAKING',
	OPIC = 'OPIC',
	JPT = 'JPT',
	JLPT = 'JLPT',
	신HSK = '신HSK',
}


export enum ResumeLinkType {
	자기소개서 = '자기소개서',
	경력기술서 = '경력기술서',
	포트폴리오 = '포트폴리오',
	외부이력서 = '외부이력서',
	기타 = '기타',
}
export class GetResumesRequest {
	@IsNumberString()
	@IsDefined()
	skip: number

	@IsNumberString()
	@IsDefined()
	limit: number

	@IsOptional()
	@IsString()
	username?: string

	@IsOptional()
	@IsString()
	title?: string

	@IsOptional()
	@IsString()
    email?: string

	@IsOptional()
	@IsArray()
	@Type(() => Number)
    skillIdList?: number[]

	@IsOptional()
	@IsNumberString()
    depth1JobCategoryId?: number

	@IsOptional()
	@IsNumberString()
    depth2JobCategoryId?: number

	@IsOptional()
	@IsArray()
	@Type(() => Number)
    depth3JobCategoryIdList?: number[]

	@IsOptional()
	@IsEnum(ResumeEducationType)
    educationLastType?: ResumeEducationType

	@IsOptional()
	@IsNumberString()
    age?: number

	@IsOptional()
	@IsNumberString()
    licenseId?: number

	@IsOptional()
	@IsNumberString()
    schoolId?: number

	@IsOptional()
	@IsEnum(ResumeLanguageLevelType)
    languageLevelType?: ResumeLanguageLevelType

	@IsOptional()
	@IsString()
    languageLevelGrade?: string
}

export class PostResumesRequest {
	@IsOptional()
	@IsNumber()
	user_id: number | null

	@IsDefined()
	@IsString()
	name: string

	@IsDefined()
	@IsString()
	title: string

	@IsDefined()
	@IsString()
	email: string

	@IsOptional()
	@IsString()
	birthday: string | null

	@IsDefined()
	@IsString()
	gender: string

	@IsOptional()
	@IsString()
	address: string | null

	@IsOptional()
	@IsString()
	phone: string | null

	@IsOptional()
	@IsString()
	profile_image: string | null

	@IsDefined()
	@IsNumber()
	depth1_job_category_id: number

	@IsDefined()
	@IsNumber()
	depth2_job_category_id: number

	@IsDefined()
	@IsArray()
	@Type(() => Number)
	depth3_job_category_ids: number[]

	@IsDefined()
	@IsArray()
	@Type(() => Number)
	skill_ids: number[]

	@IsOptional()
	@IsNumber()
	annual_income: number | null
}

export class PutResumesRequest {
	@IsOptional()
	@IsNumber()
	user_id: number | null

	@IsDefined()
	@IsString()
	name: string

	@IsDefined()
	@IsString()
	title: string

	@IsDefined()
	@IsString()
	email: string

	@IsOptional()
	@IsString()
	birthday: string | null

	@IsDefined()
	@IsString()
	gender: string

	@IsOptional()
	@IsString()
	address: string | null

	@IsOptional()
	@IsString()
	phone: string | null

	@IsOptional()
	@IsString()
	profile_image: string | null

	@IsDefined()
	@IsNumber()
	depth1_job_category_id: number

	@IsDefined()
	@IsNumber()
	depth2_job_category_id: number

	@IsDefined()
	@IsArray()
	@Type(() => Number)
	depth3_job_category_ids: number[]

	@IsDefined()
	@IsArray()
	@Type(() => Number)
	skill_ids: number[]

	@IsOptional()
	@IsNumber()
	annual_income: number | null
}

export class PostResumesResponse {
	resume_id: number
}

export class PostResumesDetailRequest {

	@IsDefined()
	@IsNumber()
	resume_id: number

	@IsArray()
	@Type(() => PostResumesDetailCareersRequest)
	careers: PostResumesDetailCareersRequest[]

	@IsArray()
	@Type(() => PostResumesDetailActivitiesRequest)
	activities: PostResumesDetailActivitiesRequest[]

	@IsArray()
	@Type(() => PostResumesDetailAwardsRequest)
	awards: PostResumesDetailAwardsRequest[]

	@IsArray()
	@Type(() => PostResumesDetailLanguageTestsRequest)
	language_tests: PostResumesDetailLanguageTestsRequest[]

	@IsArray()
	@Type(() => PostResumesDetailLanguageLevelsRequest)
	language_levels: PostResumesDetailLanguageLevelsRequest[]

	@IsArray()
	@Type(() => PostResumesDetailEducationsRequest)
	educations: PostResumesDetailEducationsRequest[]

	@IsArray()
	@Type(() => PostResumesDetailLicensesRequest)
	licenses: PostResumesDetailLicensesRequest[]

	@IsArray()
	@Type(() => PostResumesDetailLinksRequest)
	links: PostResumesDetailLinksRequest[]

	@IsArray()
	@Type(() => PostResumesDetailProjectsRequest)
	projects: PostResumesDetailProjectsRequest[]
}

export class GetResumesResponse {
	item_list: ResumeModel[]
	total_count: number
}

export class GetResumesDetailResponse {
	item: ResumeModel
}

export class GetResumesDetailCareersResponse {
	item_list: ResumeCareerModel[]
}

export class GetResumesDetailActivitiesResponse {
	item_list: ResumeActivityModel[]
}

export class GetResumesDetailAwardsResponse {
	item_list: ResumeAwardModel[]
}

export class GetResumesDetailLanguageTestsResponse {
	item_list: ResumeLanguageTestModel[]
}

export class GetResumesDetailLanguageLevelsResponse {
	item_list: ResumeLanguageLevelModel[]
}

export class GetResumesDetailLicensesResponse {
	item_list: ResumeLicenseModel[]
}

export class GetResumesDetailLinksResponse {
	item_list: ResumeLinkModel[]
}

export class GetResumesDetailProjectsResponse {
	item_list: ResumeProjectModel[]
}

export class GetResumesDetailEducationsResponse {
	item_list: ResumeEducationModel[]
}

export class GetResumesDetailDescriptionsResponse {
	item_list: ResumeDescriptionModel[]
}

export class ResumeModel {
	constructor(
		id: number,
		name: string,
		title: string,
		email: string,
		birthday: string | null,
		gender: string,
		address: string | null,
		phone: string | null,
		profileImage: string | null,
		status: ResumeStatus,
		depth1JobCategory: JobCategoryModel,
		depth2JobCategory: JobCategoryModel,
		depth3JobCategoryList: JobCategoryModel[],
		skillList: SkillModel[],
		annualIncome: number | null,
		user: UserModel | null,
	) {
		this.id = id
		this.name = name
		this.title = title
		this.email = email
		this.birthday = birthday
		this.gender = gender
		this.address = address
		this.phone = phone
		this.profileImage = profileImage
		this.status = status
		this.depth1JobCategory = depth1JobCategory
		this.depth2JobCategory = depth2JobCategory
		this.depth3JobCategoryList = depth3JobCategoryList
		this.skillList = skillList
		this.annualIncome = annualIncome
		this.user = user
	}
	id: number
	name: string
	title: string
	email: string
	birthday: string | null
	gender: string
	address: string | null
	phone: string | null
	profileImage: string | null
	status: ResumeStatus
	depth1JobCategory: JobCategoryModel
	depth2JobCategory: JobCategoryModel
	depth3JobCategoryList: JobCategoryModel[]
	skillList: SkillModel[]
	annualIncome: number | null
	enabled: boolean
	user: UserModel | null
}

export class ResumeTaskModel {
	constructor(
		id: number,
		title: string,
		description: string,
	) {
		this.id = id
		this.title = title
		this.description = description
	}
	id: number
	title: string
	description: string
}

export class PostResumesDetailTasksRequest {
	@IsOptional()
	@IsNumber()
	id: number | null

	@IsDefined()
	@IsString()
	title: string

	@IsDefined()
	@IsString()
	description: string
}

export class ResumeCareerModel {
	constructor(
		id: number,
		started_at: Date,
		ended_at: Date | null,
		company_name: string,
		company_description: string,
		organization: string,
		charge: string,
		career_period_months: number,
		tasks: ResumeTaskModel[],
	) {
		this.id = id
		this.started_at = started_at
		this.ended_at = ended_at
		this.company_name = company_name
		this.company_description = company_description
		this.organization = organization
		this.charge = charge
		this.career_period_months = career_period_months
		this.tasks = tasks
	}
	id: number
	started_at: Date
	ended_at: Date | null
	company_name: string
	company_description: string
	organization: string
	charge: string
	career_period_months: number
	tasks: ResumeTaskModel[]
}

export class PostResumesDetailCommonRequest<T> {
	@IsArray()
	@IsDefined()
	data_list: T[]
}

export class PostResumesDetailCareersRequest {
	@IsOptional()
	@IsNumber()
	id: number | null

	@IsDefined()
	@IsString()
	@MaxLength(30)
	company_name: string

	@IsOptional()
	@MaxLength(30)
	company_description: string | null

	@IsDefined()
	@IsString()
	organization: string

	@IsDefined()
	@IsString()
	charge: string

	@IsDefined()
	@IsNumber()
	started_at: number

	@IsOptional()
	@IsNumber()
	ended_at: number | null

	@IsDefined()
	@IsNumber()
	order_num: number

	@IsArray()
	@Type(() => PostResumesDetailTasksRequest)
	tasks: PostResumesDetailTasksRequest[]
}

export class ResumeLicenseModel {
	constructor(
		license_id: number | null,
		name: string,
		applied_at: Date,
		organization: string,
	) {
		this.license_id = license_id
		this.name = name
		this.applied_at = applied_at
		this.organization = organization
	}
	license_id: number | null
	name: string
	applied_at: Date
	organization: string
}

export class PostResumesDetailLicensesRequest {
	@IsDefined()
	@IsString()
	name: string

	@IsOptional()
	@IsNumber()
	license_id: number | null

	@IsDefined()
	@IsString()
	organization: string

	@IsDefined()
	@IsNumber()
	applied_at: number
}

export class ResumeLanguageTestModel {
	constructor(
		type: ResumeLanguageTestType,
		score: string,
		applied_at: Date,
	) {
		this.type = type
		this.score = score
		this.applied_at = applied_at
	}
	type: ResumeLanguageTestType
	score: string
	applied_at: Date
}

export class PostResumesDetailLanguageTestsRequest {
	@IsEnum(ResumeLanguageTestType)
	@IsString()
	type: ResumeLanguageTestType

	@IsDefined()
	@IsString()
	score: string

	@IsDefined()
	@IsNumber()
	applied_at: number
}


export class ResumeLanguageLevelModel {
	constructor(
		type: ResumeLanguageLevelType,
		grade: string,
	) {
		this.type = type
		this.grade = grade
	}
	type: ResumeLanguageLevelType
	grade: string
}

export class PostResumesDetailLanguageLevelsRequest {
	@IsEnum(ResumeLanguageLevelType)
	@IsString()
	type: ResumeLanguageLevelType

	@IsDefined()
	@IsString()
	grade: string
}

export class ResumeDescriptionModel {
	constructor(
		id: number,
		title: string,
		content: string,
	) {
		this.id = id
		this.title = title
		this.content = content
	}
	id: number
	title: string
	content: string
}

export class PostResumesDetailDescriptionsRequest {
	@IsOptional()
	@IsNumber()
	id: number | null

	@IsDefined()
	@IsString()
	title: string

	@IsDefined()
	@IsString()
	content: string
}

export class ResumeEducationModel {
	constructor(
		status: ResumeEducationStatus,
		type: ResumeEducationType,
		target_id: number | null,
		name: string,
		started_at: Date,
		ended_at: Date,
		major: string | null,
		score: string | null,
	) {
		this.status = status
		this.type = type
		this.target_id = target_id
		this.name = name
		this.started_at = started_at
		this.ended_at = ended_at
		this.major = major
		this.score = score
	}
	status: ResumeEducationStatus
	type: ResumeEducationType
	target_id: number | null
	name: string
	started_at: Date
	ended_at: Date | null
	major: string | null
	score: string | null
}

export class PostResumesDetailEducationsRequest {
	@IsDefined()
	@IsEnum(ResumeEducationStatus)
	status: ResumeEducationStatus

	@IsDefined()
	@IsEnum(ResumeEducationType)
	type: ResumeEducationType

	@IsOptional()
	@IsNumber()
	target_id: number | null

	@IsDefined()
	@IsString()
	name: string

	@IsDefined()
	@IsNumber()
	started_at: number

	@IsOptional()
	@IsNumber()
	ended_at: number | null

	@IsOptional()
	@IsString()
	major: string | null

	@IsOptional()
	@IsString()
	score: string | null
}

export class ResumeAwardModel {
	constructor(
		title: string,
		description: string,
		dated_at: Date,
	) {
		this.title = title
		this.description = description
		this.dated_at = dated_at
	}
	title: string
	description: string
	dated_at: Date
}

export class PostResumesDetailAwardsRequest {
	@IsDefined()
	@IsString()
	title: string

	@IsDefined()
	@IsString()
	description: string

	@IsDefined()
	@IsNumber()
	dated_at: number
}

export class ResumeActivityModel {
	constructor(
		title: string,
		description: string,
		started_at: Date,
		ended_at: Date,
	) {
		this.title = title
		this.description = description
		this.started_at = started_at
		this.ended_at = ended_at
	}
	title: string
	description: string
	started_at: Date
	ended_at: Date
}

export class PostResumesDetailActivitiesRequest {
	@IsDefined()
	@IsString()
	title: string

	@IsDefined()
	@IsString()
	description: string

	@IsDefined()
	@IsNumber()
	started_at: number

	@IsDefined()
	@IsNumber()
	ended_at: number
}

export class ResumeProjectModel {
	constructor(
		title: string,
		description: string,
		started_at: Date,
		ended_at: Date,
	) {
		this.title = title
		this.description = description
		this.started_at = started_at
		this.ended_at = ended_at
	}
	title: string
	description: string
	started_at: Date
	ended_at: Date
}

export class PostResumesDetailProjectsRequest {
	@IsDefined()
	@IsString()
	title: string

	@IsDefined()
	@IsString()
	description: string

	@IsDefined()
	@IsNumber()
	started_at: number

	@IsDefined()
	@IsNumber()
	ended_at: number
}


export class ResumeLinkModel {
	constructor(
		type: ResumeLinkType,
		url: string | null,
		original_name: string | null,
		key: string | null,
	) {
		this.type = type
		this.url = url
		this.original_name = original_name
		this.key = key
	}
	type: ResumeLinkType
	url: string | null
	original_name: string | null
	key: string | null
}

export class PostResumesDetailLinksRequest {
	@IsDefined()
	@IsEnum(ResumeLinkType)
	type: ResumeLinkType

	@IsOptional()
	@IsString()
	url: string | null

	@IsOptional()
	@IsString()
	original_name: string | null

	@IsOptional()
	@IsString()
	key: string | null
}