import { Body, Controller, Get, Inject, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { GetResumesDetailActivitiesResponse, GetResumesDetailAwardsResponse, GetResumesDetailCareersResponse,
	GetResumesDetailDescriptionsResponse,
	GetResumesDetailEducationsResponse,
	GetResumesDetailLanguageLevelsResponse,
	GetResumesDetailLanguageTestsResponse,
	GetResumesDetailLicensesResponse,
	GetResumesDetailLinksResponse,
	GetResumesDetailProjectsResponse,
	GetResumesDetailResponse,
	GetResumesRequest,
	GetResumesResponse,
	PostResumesDetailCommonRequest,
	PostResumesDetailDescriptionsRequest,
	PostResumesDetailRequest,
	PostResumesRequest,
	PostResumesResponse,
	PutResumesRequest } from '@recruit/interface'
import { JobCategoryService } from 'src/services/JobCategoryService'
import { ResumeService } from 'src/services/ResumeService'
import { SkillService } from 'src/services/SkillService'
import { Transactional } from 'typeorm-transactional-cls-hooked'

// @UseGuards(JwtAuthGuard)
@Controller('resumes')
export class ResumeController {

	@Inject() private readonly resumeService: ResumeService
	@Inject() private readonly jobCategoryService: JobCategoryService
	@Inject() private readonly skillService: SkillService

	@Get()
	async resumeList(@Query() query: GetResumesRequest): Promise<GetResumesResponse> {
		const [itemList, totalCount] = await this.resumeService.getResumes(
			query.skip, query.limit, query.username, query.email, query.skillIdList, query.depth1JobCategoryId,
			query.depth2JobCategoryId, query.depth3JobCategoryIdList, query.educationLastType, query.age,
			query.licenseId, query.schoolId, query.languageLevelType, query.languageLevelGrade, query.title
		)
		const definedResumeList = await Promise.all(
			itemList.map(async (resume) => {
				const depth3JobCategoryList = await this.jobCategoryService.getJobCategoryByIds(resume.depth3JobCategoryIds)
				const skillList = await this.skillService.getSkillsByIds(resume.skillIds)
				const definedDepth1JobCategory = this.jobCategoryService.definedJobCategoryModel(resume.depth1JobCategory)
				const definedDepth2JobCategory = this.jobCategoryService.definedJobCategoryModel(resume.depth2JobCategory)
				const definedDepth3JobCategoryList = depth3JobCategoryList.map((jc) => this.jobCategoryService.definedJobCategoryModel(jc))
				const definedSkillList = skillList.map((skill) => this.skillService.defineSkillModel(skill))
				return this.resumeService.definedResumeModel(resume, definedDepth1JobCategory, definedDepth2JobCategory,
					definedDepth3JobCategoryList, definedSkillList)
			})
		)
		return {
			item_list: definedResumeList, total_count: totalCount
		}
	}

	@Get(':id(\\d+)')
	async getResume(@Param('id') id: number): Promise<GetResumesDetailResponse> {
		const resume = await this.resumeService.getResume(id)
		const depth3JobCategoryList = await this.jobCategoryService.getJobCategoryByIds(resume.depth3JobCategoryIds)
		const skillList = await this.skillService.getSkillsByIds(resume.skillIds)
		const definedDepth1JobCategory = this.jobCategoryService.definedJobCategoryModel(resume.depth1JobCategory)
		const definedDepth2JobCategory = this.jobCategoryService.definedJobCategoryModel(resume.depth2JobCategory)
		const definedDepth3JobCategoryList = depth3JobCategoryList.map((jc) => this.jobCategoryService.definedJobCategoryModel(jc))
		const definedSkillList = skillList.map((skill) => this.skillService.defineSkillModel(skill))
		const definedResume = this.resumeService.definedResumeModel(resume, definedDepth1JobCategory, definedDepth2JobCategory,
			definedDepth3JobCategoryList, definedSkillList)
		return {
			item: definedResume
		}
	}


	@Post()
	async createResume(@Body() body: PostResumesRequest): Promise<PostResumesResponse> {
		const resume = await this.resumeService.createResume(body.user_id, body.depth1_job_category_id, body.depth2_job_category_id,
			body.depth3_job_category_ids, body.skill_ids, body.annual_income,
			body.email, body.name, body.address, body.phone, body.gender, body.profile_image, body.title
		)
		return {
			resume_id: resume.id
		}
	}

	@Put(':id(\\d+)')
	async updateResume(@Param('id') id: number, @Body() body: PutResumesRequest) {
		const resume = await this.resumeService.updateResume(id, body.user_id, body.depth1_job_category_id, body.depth2_job_category_id,
			body.depth3_job_category_ids, body.skill_ids, body.annual_income,
			body.email, body.name, body.address, body.phone, body.gender, body.profile_image, body.birthday, body.title
		)
		return {
			resume_id: resume.id
		}
	}

	@Transactional()
	@Post(':id(\\d+)')
	async upsertResumes(@Param('id') resumeId: number, @Body() body: PostResumesDetailRequest) {
		// career
		const careers = body.careers
		await this.resumeService.deleteCareer(resumeId, careers.map((career) => career.id).filter((id) => id))
		for (const career of careers) {
			const careerEntity = await this.resumeService.upsertCareer(resumeId, career)
			career.tasks.forEach(async (task, i) => {
				await this.resumeService.upsertTask(resumeId, careerEntity.id, task, i)
			})
		}
		// activity
		await this.resumeService.upsertActiviy(resumeId, body.activities)
		// award
		await this.resumeService.upsertAward(resumeId, body.awards)
		// education
		await this.resumeService.upsertEducation(resumeId, body.educations)
		// license
		await this.resumeService.upsertLicense(resumeId, body.licenses)
		// language_test
		await this.resumeService.upsertLanguageTest(resumeId, body.language_tests)
		// language_level
		await this.resumeService.upsertLanguageLevel(resumeId, body.language_levels)
		//project
		await this.resumeService.upsertProject(resumeId, body.projects)
		// link
		await this.resumeService.upsertLink(resumeId, body.links)
		return true
	}

	@Post(':id(\\d+)/descriptions')
	async upsertDescriptions(@Param('id') resumeId: number,
		@Body() body: PostResumesDetailCommonRequest<PostResumesDetailDescriptionsRequest>) {
		body.data_list.forEach(async (data, i) => {
			await this.resumeService.upsertDescription(resumeId, data, i)
		})
		return true
	}

	@Get(':id(\\d+)/careers')
	async getCareers(@Param('id') id: number): Promise<GetResumesDetailCareersResponse> {
		const careers = await this.resumeService.getCareers(id)
		return { item_list: careers }
	}

	@Get(':id(\\d+)/activities')
	async getActivities(@Param('id') id: number): Promise<GetResumesDetailActivitiesResponse> {
		const itemList = await this.resumeService.getActivities(id)
		return { item_list: itemList }
	}

	@Get(':id(\\d+)/awards')
	async getAwards(@Param('id') id: number): Promise<GetResumesDetailAwardsResponse> {
		const itemList = await this.resumeService.getAwards(id)
		return { item_list: itemList }
	}

	@Get(':id(\\d+)/projects')
	async getProjects(@Param('id') id: number): Promise<GetResumesDetailProjectsResponse> {
		const itemList = await this.resumeService.getProjects(id)
		return { item_list: itemList }
	}

	@Get(':id(\\d+)/licenses')
	async getLicenses(@Param('id') id: number): Promise<GetResumesDetailLicensesResponse> {
		const itemList = await this.resumeService.getLicenses(id)
		return { item_list: itemList }
	}

	@Get(':id(\\d+)/language_tests')
	async getLanguageTests(@Param('id') id: number): Promise<GetResumesDetailLanguageTestsResponse> {
		const itemList = await this.resumeService.getLanguageTests(id)
		return { item_list: itemList }
	}

	@Get(':id(\\d+)/language_levels')
	async getLanguageLevels(@Param('id') id: number): Promise<GetResumesDetailLanguageLevelsResponse> {
		const itemList = await this.resumeService.getLanguageLevels(id)
		return { item_list: itemList }
	}

	@Get(':id(\\d+)/educations')
	async getEducations(@Param('id') id: number): Promise<GetResumesDetailEducationsResponse> {
		const itemList = await this.resumeService.getEducations(id)
		return { item_list: itemList }
	}

	@Get(':id(\\d+)/links')
	async getLinks(@Param('id') id: number): Promise<GetResumesDetailLinksResponse> {
		const itemList = await this.resumeService.getLinks(id)
		return { item_list: itemList }
	}

	@Get(':id(\\d+)/descriptions')
	async getDescriptions(@Param('id') id: number): Promise<GetResumesDetailDescriptionsResponse> {
		const itemList = await this.resumeService.getDescriptions(id)
		return { item_list: itemList }
	}
}
