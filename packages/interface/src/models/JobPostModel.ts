import { Type } from 'class-transformer'
import { IsArray, IsDefined, IsEnum, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator'
import { CompanyModel } from './CompanyModel'
import { JobCategoryModel } from './JobCategoryModel'
import { ResumeEducationType } from './ResumeModel'
import { SkillModel } from './SkillModel'

export enum CareerType {
	신입 = '신입',
	경력 = '경력',
	'신입/경력' = '신입/경력',
}

export enum JobPostTerminatedReason {
	상시채용 = '상시채용',
	채용시까지 = '채용시까지',
	기간만료시 = '기간만료시',
}

export enum JobPostStatus {
	OPEN = 'OPEN',
	CLOSE = 'CLOSE',
}

export enum JobPostProcess {
	서류검토 = '서류검토',
	사전과제 = '사전과제',
	인성 = '인성',
	'1차면접' = '1차면접',
	'2차면접' = '2차면접',
	'3차면접' = '3차면접',
	'처우협의' = '처우협의',
}

export class JobPostFileModel {
	constructor(id: number, name: string, key: string) {
		this.id = id
		this.name = name
		this.key = key
	}
	id: number
	name: string
	key: string
}

export class JobPostModel {
	constructor(
		id: number,
		title: string,
		description: string,
		terminatedReason: JobPostTerminatedReason,
		careerType: CareerType,
		careerPeriod: number,
		status: JobPostStatus,
		startedAt: Date,
		endedAt: Date | null,
		linkUrl: string,
		depth1JobCategory: JobCategoryModel,
		depth2JobCategory: JobCategoryModel,
		depth3JobCategoryList: JobCategoryModel[],
		company: CompanyModel,
		skillList: SkillModel[],
		memo: string | null,
		minEducationType: ResumeEducationType | null,
		minAge: number | null,
		maxAge: number | null,
		minAnnualIncome: number | null,
		maxAnnualIncome: number | null,
		workPlace: string | null,
		process: JobPostProcess[],
		charge: string | null,
		files: JobPostFileModel[]
	) {
		this.id = id
		this.title = title
		this.description = description
		this.terminatedReason = terminatedReason
		this.careerType = careerType
		this.careerPeriod = careerPeriod
		this.status = status
		this.startedAt = startedAt
		this.endedAt = endedAt
		this.linkUrl = linkUrl
		this.depth1JobCategory = depth1JobCategory
		this.depth2JobCategory = depth2JobCategory
		this.depth3JobCategoryList = depth3JobCategoryList
		this.company = company
		this.skillList = skillList
		this.memo = memo
		this.minEducationType = minEducationType
		this.minAge = minAge
		this.maxAge = maxAge
		this.minAnnualIncome = minAnnualIncome
		this.maxAnnualIncome = maxAnnualIncome
		this.workPlace = workPlace
		this.process = process
		this.charge = charge
		this.files = files
	}
	id: number
	title: string
	description: string
	terminatedReason: JobPostTerminatedReason
	careerType: CareerType
	careerPeriod: number
	status: JobPostStatus
	startedAt: Date
	endedAt: Date | null
	linkUrl: string
	depth1JobCategory: JobCategoryModel
	depth2JobCategory: JobCategoryModel
	depth3JobCategoryList: JobCategoryModel[]
	company: CompanyModel
	skillList: SkillModel[]
	memo: string | null
	minEducationType: ResumeEducationType | null
	minAge: number | null
	maxAge: number | null
	minAnnualIncome: number | null
	maxAnnualIncome: number | null
	workPlace: string | null
	process: JobPostProcess[]
	charge: string | null
	files: JobPostFileModel[]
}



export class GetJobPostsRequest {

	@IsNumberString()
	@IsDefined()
	skip: number

	@IsNumberString()
	@IsDefined()
	limit: number

	@IsOptional()
	@IsString()
	title: string | null
}

export class GetJobPostsResponse {
	itemList: JobPostModel[]
	totalCount: number
}

export class GetJobPostsDetailResponse {
	item: JobPostModel
}

export class PostJobPostsRequest {
	@IsString()
	@IsDefined()
	title: string

	@IsString()
	@IsDefined()
	description: string

	@IsEnum(JobPostTerminatedReason)
	@IsDefined()
	terminatedReason: JobPostTerminatedReason

	@IsEnum(CareerType)
	@IsDefined()
	careerType: CareerType

	@IsDefined()
	@IsNumber()
	careerPeriod: number

	@IsEnum(JobPostStatus)
	@IsDefined()
	status: JobPostStatus

	@IsNumber()
	@IsDefined()
	startedAt: number

	@IsNumber()
	@IsOptional()
	endedAt: number | null

	@IsString()
	@IsDefined()
	linkUrl: string

	@IsDefined()
	@IsNumber()
	depth1JobCategoryId: number

	@IsDefined()
	@IsNumber()
	depth2JobCategoryId: number

	@IsDefined()
	@IsArray()
	@Type(() => Number)
	depth3JobCategoryIdList: number[]

	@IsNumber()
	@IsDefined()
	companyId: number

	@IsDefined()
	@IsArray()
	@Type(() => Number)
	skillIdList: number[]

	@IsOptional()
	@IsString()
	memo: string | null

	@IsOptional()
	@IsEnum(ResumeEducationType)
	minEducationType: ResumeEducationType | null

	@IsOptional()
	@IsNumber()
	minAge: number | null

	@IsOptional()
	@IsNumber()
	maxAge: number | null

	@IsOptional()
	@IsNumber()
	minAnnualIncome: number | null

	@IsOptional()
	@IsNumber()
	maxAnnualIncome: number | null

	@IsOptional()
	@IsString()
	workPlace: string | null

	@IsOptional()
	@IsEnum(JobPostProcess, {each: true})
	process: JobPostProcess[]

	@IsOptional()
	@IsString()
	charge: string | null

	@IsOptional()
	@IsArray()
	@Type(() => JobPostFileRequest)
	files: JobPostFileRequest[]
}

export class JobPostFileRequest {
	id?: number
	name: string
	key: string
}

export class PutJobPostsDetailRequest {
	@IsString()
	@IsDefined()
	title: string

	@IsString()
	@IsDefined()
	description: string

	@IsEnum(JobPostTerminatedReason)
	@IsDefined()
	terminatedReason: JobPostTerminatedReason

	@IsEnum(CareerType)
	@IsDefined()
	careerType: CareerType

	@IsDefined()
	@IsNumber()
	careerPeriod: number

	@IsEnum(JobPostStatus)
	@IsDefined()
	status: JobPostStatus

	@IsNumber()
	@IsDefined()
	startedAt: number

	@IsNumber()
	@IsOptional()
	endedAt: number | null

	@IsString()
	@IsDefined()
	linkUrl: string

	@IsDefined()
	@IsNumber()
	depth1JobCategoryId: number

	@IsDefined()
	@IsNumber()
	depth2JobCategoryId: number

	@IsDefined()
	@IsArray()
	@Type(() => Number)
	depth3JobCategoryIdList: number[]

	@IsDefined()
	@IsArray()
	@Type(() => Number)
	skillIdList: number[]

	@IsOptional()
	@IsString()
	memo: string | null

	@IsOptional()
	@IsEnum(ResumeEducationType)
	minEducationType: ResumeEducationType | null

	@IsOptional()
	@IsNumber()
	minAge: number | null

	@IsOptional()
	@IsNumber()
	maxAge: number | null

	@IsOptional()
	@IsNumber()
	minAnnualIncome: number | null

	@IsOptional()
	@IsNumber()
	maxAnnualIncome: number | null

	@IsOptional()
	@IsString()
	workPlace: string | null

	@IsOptional()
	@IsEnum(JobPostProcess, {each: true})
	process: JobPostProcess[]

	@IsOptional()
	@IsString()
	charge: string | null

	@IsOptional()
	@IsArray()
	@Type(() => JobPostFileRequest)
	files: JobPostFileRequest[]
}

