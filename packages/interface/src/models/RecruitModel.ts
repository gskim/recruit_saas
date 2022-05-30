import { IsDefined, IsEnum, IsNumber, IsNumberString, IsOptional, IsString, MaxLength } from 'class-validator'
import { AdminModel } from './AdminModel'
import { CompanyModel } from './CompanyModel'
import { JobPostModel } from './JobPostModel'
import { ResumeModel } from './ResumeModel'

export enum RecruitStatus {
	OPEN = 'OPEN',
	CLOSE = 'CLOSE',
}

export enum RecruitProcess {
	서류검토 = '서류검토',
	사전과제 = '사전과제',
	인성 = '인성',
	'1차면접' = '1차면접',
	'2차면접' = '2차면접',
	'3차면접' = '3차면접',
	'처우협의' = '처우협의',
}

export class RecruitModel {
	constructor(
		id: number,
		title: string,
		description: string | null,
		status: RecruitStatus,
		process: RecruitProcess,
		company: {
			company_id: number,
			company_name: string,
		},
		job_post: {
			job_post_id: number,
			job_post_title: string,
		},
		resume: {
			resume_id: number,
			resume_name: string,
			resume_profile_image: string | null,
			resume_title: string,
		},
	) {
		this.id = id
		this.status = status
		this.title = title
		this.description = description
		this.process = process
		this.company = company
		this.resume = resume
		this.job_post = job_post
	}
	id: number
	title: string
	description: string | null
	status: RecruitStatus
	process: RecruitProcess
	company: {
		company_id: number,
		company_name: string,
	}
	job_post: {
		job_post_id: number,
		job_post_title: string,
	}
	resume: {
		resume_id: number,
		resume_name: string,
		resume_profile_image: string | null
		resume_title: string,
	}
}

export class GetRecruitsRequest {

	@IsNumberString()
	@IsDefined()
	skip: number

	@IsNumberString()
	@IsDefined()
	limit: number

	@IsOptional()
	@IsEnum(RecruitProcess)
	process: RecruitProcess | null

	@IsOptional()
	@IsEnum(RecruitStatus)
	status: RecruitStatus | null

	@IsOptional()
	@IsString()
	title: string | null

	@IsOptional()
	@IsString()
	user_email: string | null

	@IsOptional()
	@IsNumberString()
	company_id: number | null

}

export class PostRecruitsResponse {
	recruit_id: number
}

export class GetRecruitsResponse {
	item_list: RecruitModel[]
	total_count: number
}

export class GetRecruitsDetailResponse {
	item: RecruitModel
}

export class PostRecruitsRequest {
	@IsNumber()
	@IsDefined()
	resumeId: number

	@IsNumber()
	@IsDefined()
	jobPostId: number

	@IsString()
	@IsDefined()
	@MaxLength(50)
	title: string

	@IsString()
	@IsOptional()
	@MaxLength(300)
	description: string | null
}

export class PutRecruitsDetailRequest {
	@IsString()
	@IsOptional()
	@MaxLength(300)
	description: string | null

	@IsDefined()
	@IsEnum(RecruitStatus)
	status: RecruitStatus

	@IsDefined()
	@IsEnum(RecruitProcess)
	process: RecruitProcess
}

export class PutRecruitsDetailDescriptionRequest {

	@IsString()
	@IsDefined()
	@MaxLength(50)
	title: string

	@IsString()
	@IsOptional()
	@MaxLength(300)
	description: string | null
}

export class PutRecruitsDetailStatusRequest {
	@IsEnum(RecruitStatus)
	@IsDefined()
	status: RecruitStatus
}

export class PutRecruitsDetailProcessRequest {
	@IsEnum(RecruitProcess)
	@IsDefined()
	process: RecruitProcess
}