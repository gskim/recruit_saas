import { Body, Controller, Get, Inject, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { GetRecruitsDetailErrorCode, GetRecruitsDetailResponse, GetRecruitsRequest, GetRecruitsResponse,
	PostRecruitsErrorCode,
	PostRecruitsRequest,
	PutRecruitsDetailDescriptionRequest, PutRecruitsDetailProcessRequest,
	PutRecruitsDetailRequest, PutRecruitsDetailStatusRequest } from '@recruit/interface'
import { JwtAuthGuard } from 'src/AuthGuards'
import { CurrentUser } from 'src/CustomDecorator'
import { CustomError } from 'src/CustomError'
import { Admin } from 'src/entities/Admin'
import { JobPostService } from 'src/services/JobPostService'
import { RecruitService } from 'src/services/RecruitService'
import { ResumeService } from 'src/services/ResumeService'

@UseGuards(JwtAuthGuard)
@Controller('recruits')
export class RecruitController {

	@Inject() private readonly recruitService: RecruitService
	@Inject() private readonly jobPostService: JobPostService
	@Inject() private readonly resumeService: ResumeService

	@Post()
	async createRecruit(@Body() body: PostRecruitsRequest, @CurrentUser() admin: Admin) {
		const resume = await this.resumeService.getResume(body.resumeId)
		if (!resume) {
			throw new CustomError(PostRecruitsErrorCode.NOT_FOUND_RESUME)
		}
		const jobPost = await this.jobPostService.getJobPostById(body.jobPostId)
		if (!jobPost) {
			throw new CustomError(PostRecruitsErrorCode.NOT_FOUND_JOB_POST)
		}

		const recruit = await this.recruitService.createRecruit(resume.userId, body.title,
			body.resumeId, body.jobPostId, jobPost.companyId, admin.id,
			body.description)
		return {
			recruit_id: recruit.id
		}
	}

	@Put(':id(\\d+)')
	async updateRecruit(@Param('id') id: number,
		@Body() body: PutRecruitsDetailRequest, @CurrentUser() admin: Admin)
	{
		await this.recruitService.updateRecruit(id, body.description, body.status, body.process, admin.id)
		return true
	}

	@Put(':id(\\d+)/description')
	async updateDescription(@Param('id') id: number,
		@Body() body: PutRecruitsDetailDescriptionRequest, @CurrentUser() admin: Admin)
	{
		await this.recruitService.updateRecruitDescription(id, body.title, body.description, admin.id)
		return true
	}

	@Put(':id(\\d+)/status')
	async updateStatus(@Param('id') id: number,
		@Body() body: PutRecruitsDetailStatusRequest, @CurrentUser() admin: Admin)
	{
		await this.recruitService.updateRecruitStatus(id, body.status, admin.id)
		return true
	}

	@Put(':id(\\d+)/process')
	async updateProcess(@Param('id') id: number,
		@Body() body: PutRecruitsDetailProcessRequest, @CurrentUser() admin: Admin)
	{
		await this.recruitService.updateRecruitProcess(id, body.process, admin.id)
		return true
	}


	@Get(':id(\\d+)')
	async getRecruit(@Param('id') id: number): Promise<GetRecruitsDetailResponse> {
		const recruit = await this.recruitService.getRecruit(id)
		if (!recruit) {
			throw new CustomError(GetRecruitsDetailErrorCode.NOT_FOUND)
		}
		const company = recruit.company
		const jobPost = recruit.jobPost
		const resume = recruit.resume
		return {
			item: this.recruitService.defineRecruitModel(recruit, company, jobPost, resume)
		}
	}

	@Get()
	async getRecruits(@Query() query: GetRecruitsRequest): Promise<GetRecruitsResponse> {
		const [ recruits, totalCount] = await this.recruitService.getRecruits(query.skip, query.limit,
			query.process, query.user_email, query.company_id, query.status, query.title)
		const itemList = recruits.map((recruit) => {
			return this.recruitService.defineRecruitModel(recruit, recruit.company, recruit.jobPost, recruit.resume)
		})
		return {
			item_list: itemList,
			total_count: totalCount,
		}
	}
}
