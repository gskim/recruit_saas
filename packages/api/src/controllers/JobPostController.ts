import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common'
import { CustomError } from 'src/CustomError'
import { GetJobPostsDetailErrorCode, GetJobPostsDetailResponse, GetJobPostsRequest, GetJobPostsResponse,
	PostJobPostsErrorCode, PostJobPostsRequest, PutJobPostsDetailErrorCode, PutJobPostsDetailRequest } from '@recruit/interface'
import { JobPostService } from 'src/services/JobPostService'
import { JobCategoryService } from 'src/services/JobCategoryService'
import { CompanyService } from 'src/services/CompanyService'
import { SkillService } from 'src/services/SkillService'

@Controller('job_posts')
export class JobPostController {

	@Inject() private readonly jobPostService: JobPostService
	@Inject() private readonly jobCategoryService: JobCategoryService
	@Inject() private readonly companyService: CompanyService
	@Inject() private readonly skillService: SkillService

	@Get()
	async getJobPosts(@Query() query: GetJobPostsRequest): Promise<GetJobPostsResponse> {
		const [itemList, totalCount] = await this.jobPostService.getJobPostsWithRelations(query.skip, query.limit, query.title)
		const definedJobPostList = await Promise.all(
			itemList.map(async (jobPost) => {
				const depth3JobCategoryList = await this.jobCategoryService.getJobCategoryByIds(jobPost.depth3JobCategoryIds)
				const skillList = await this.skillService.getSkillsByIds(jobPost.skillIds)
				const definedDepth1JobCategory = this.jobCategoryService.definedJobCategoryModel(jobPost.depth1JobCategory)
				const definedDepth2JobCategory = this.jobCategoryService.definedJobCategoryModel(jobPost.depth2JobCategory)
				const definedDepth3JobCategoryList = depth3JobCategoryList.map((jc) => this.jobCategoryService.definedJobCategoryModel(jc))
				const definedSkillList = skillList.map((skill) => this.skillService.defineSkillModel(skill))
				const definedCompany = this.companyService.defineCompanyModel(jobPost.company)
				return this.jobPostService.defineJobPostModel(jobPost, definedDepth1JobCategory, definedDepth2JobCategory,
					definedDepth3JobCategoryList, definedSkillList, definedCompany)
			})
		)
		return {
			totalCount: totalCount,
			itemList: definedJobPostList,
		}
	}

	@Get(':id(\\d+)')
	async getJobPost(@Param('id') id: number): Promise<GetJobPostsDetailResponse> {
		const jobPost = await this.jobPostService.getJobPostWithRelationsById(id)
		if (!jobPost) {
			throw new CustomError(GetJobPostsDetailErrorCode.NOT_FOUND)
		}
		const depth3JobCategoryList = await this.jobCategoryService.getJobCategoryByIds(jobPost.depth3JobCategoryIds)
		const skillList = await this.skillService.getSkillsByIds(jobPost.skillIds)
		const definedDepth1JobCategory = this.jobCategoryService.definedJobCategoryModel(jobPost.depth1JobCategory)
		const definedDepth2JobCategory = this.jobCategoryService.definedJobCategoryModel(jobPost.depth2JobCategory)
		const definedDepth3JobCategoryList = depth3JobCategoryList.map((jc) => this.jobCategoryService.definedJobCategoryModel(jc))
		const definedSkillList = skillList.map((skill) => this.skillService.defineSkillModel(skill))
		const definedCompany = this.companyService.defineCompanyModel(jobPost.company)

		const definedJobPost = this.jobPostService.defineJobPostModel(jobPost, definedDepth1JobCategory, definedDepth2JobCategory,
			definedDepth3JobCategoryList, definedSkillList, definedCompany)
		return { item: definedJobPost }
	}

	@Post()
	async createJobPost(@Body() body: PostJobPostsRequest) {

		if (body.startedAt >= body.endedAt) {
			throw new CustomError(PutJobPostsDetailErrorCode.WRONG_DATE)
		}

		const company = await this.companyService.getOne(body.companyId)
		if (!company) {
			throw new CustomError(PostJobPostsErrorCode.NOT_FOUND_COMPANY)
		}
		const depth1JobCategory = await this.jobCategoryService.getJobCategory(body.depth1JobCategoryId)
		if (!depth1JobCategory || depth1JobCategory.depth !== 0) {
			throw new CustomError(PostJobPostsErrorCode.NOT_FOUND_JOB_CATEGORY, 'Not Found depth 1 Job Category')
		}

		const depth2JobCategory = await this.jobCategoryService.getJobCategory(body.depth2JobCategoryId)
		if (!depth2JobCategory || depth2JobCategory.depth !== 1) {
			throw new CustomError(PostJobPostsErrorCode.NOT_FOUND_JOB_CATEGORY, 'Not Found depth 2 Job Category')
		}
		const depth3JobCategoryList = await this.jobCategoryService.getJobCategoryByIds(body.depth3JobCategoryIdList)
		if (depth3JobCategoryList.length !== body.depth3JobCategoryIdList.length) {
			throw new CustomError(PostJobPostsErrorCode.NOT_FOUND_JOB_CATEGORY, 'Not Found depth 3 Job Category')
		}
		depth3JobCategoryList.forEach((v) => {
			if (v.depth !== 2) {
				throw new CustomError(PostJobPostsErrorCode.NOT_FOUND_JOB_CATEGORY, 'Not Found depth 3 Job Category')
			}
		})

		const skillList = await this.skillService.getSkillsByIds(body.skillIdList)
		if (skillList.length !== body.skillIdList.length) {
			throw new CustomError(PostJobPostsErrorCode.NOT_FOUND_SKILL)
		}
		await this.jobPostService.createJobPost({
			title: body.title, description: body.description, terminatedReason: body.terminatedReason,
			careerType: body.careerType, careerPeriod: body.careerPeriod, status: body.status,
			startedAt: new Date(body.startedAt), endedAt: new Date(body.endedAt), linkUrl: body.linkUrl,
			depth1JobCategoryId: body.depth1JobCategoryId, depth2JobCategoryId: body.depth2JobCategoryId,
			depth3JobCategoryIds: body.depth3JobCategoryIdList, companyId: body.companyId,
			skillIds: body.skillIdList, memo: body.memo, minEducationType: body.minEducationType, minAge: body.minAge,
			maxAge: body.maxAge, minAnnualIncome: body.minAnnualIncome, maxAnnualIncome: body.maxAnnualIncome, workPlace: body.workPlace,
			process: body.process, charge: body.charge,
		}, body.files)
		return true
	}

	@Put(':id(\\d+)')
	async updateJobPost(@Param('id') id: number, @Body() body: PutJobPostsDetailRequest) {

		if (body.endedAt && body.startedAt >= body.endedAt) {
			throw new CustomError(PutJobPostsDetailErrorCode.WRONG_DATE)
		}

		const depth1JobCategory = await this.jobCategoryService.getJobCategory(body.depth1JobCategoryId)
		if (!depth1JobCategory || depth1JobCategory.depth !== 0) {
			throw new CustomError(PutJobPostsDetailErrorCode.NOT_FOUND_JOB_CATEGORY, 'Not Found depth 1 Job Category')
		}

		const depth2JobCategory = await this.jobCategoryService.getJobCategory(body.depth2JobCategoryId)
		if (!depth2JobCategory || depth2JobCategory.depth !== 1) {
			throw new CustomError(PutJobPostsDetailErrorCode.NOT_FOUND_JOB_CATEGORY, 'Not Found depth 2 Job Category')
		}
		const depth3JobCategoryList = await this.jobCategoryService.getJobCategoryByIds(body.depth3JobCategoryIdList)
		if (depth3JobCategoryList.length !== body.depth3JobCategoryIdList.length) {
			throw new CustomError(PutJobPostsDetailErrorCode.NOT_FOUND_JOB_CATEGORY, 'Not Found depth 3 Job Category')
		}
		depth3JobCategoryList.forEach((v) => {
			if (v.depth !== 2) {
				throw new CustomError(PutJobPostsDetailErrorCode.NOT_FOUND_JOB_CATEGORY, 'Not Found depth 3 Job Category')
			}
		})

		const skillList = await this.skillService.getSkillsByIds(body.skillIdList)
		if (skillList.length !== body.skillIdList.length) {
			throw new CustomError(PostJobPostsErrorCode.NOT_FOUND_SKILL)
		}

		await this.jobPostService.updateJobPost(id, {
			title: body.title, description: body.description, terminatedReason: body.terminatedReason,
			careerType: body.careerType, careerPeriod: body.careerPeriod,
			startedAt: new Date(body.startedAt), endedAt: new Date(body.endedAt), linkUrl: body.linkUrl,
			depth1JobCategoryId: body.depth1JobCategoryId, depth2JobCategoryId: body.depth2JobCategoryId,
			depth3JobCategoryIds: body.depth3JobCategoryIdList,
			skillIds: body.skillIdList, memo: body.memo, minEducationType: body.minEducationType, minAge: body.minAge,
			maxAge: body.maxAge, minAnnualIncome: body.minAnnualIncome, maxAnnualIncome: body.maxAnnualIncome, workPlace: body.workPlace,
			process: body.process, charge: body.charge,
		}, body.files)
		return true
	}

	@Delete(':id(\\d+)')
	async deleteJobPost(@Param('id') id: number) {
		await this.jobPostService.deleteJobPost(id)
		return true
	}
}
