import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common'
import { CustomError } from 'src/CustomError'
import { GetJobCategoriesDetailErrorCode, GetJobCategoriesRequest, GetJobCategoriesResponse,
	PostJobCategoriesRequest, PutJobCategoriesDetailRequest } from '@recruit/interface'
import { JobCategoryService } from 'src/services/JobCategoryService'

@Controller('job_categories')
export class JobCategoryController {

	@Inject() private readonly jobCategoryService: JobCategoryService

	@Get()
	async getJobCategoryList(@Query() query: GetJobCategoriesRequest): Promise<GetJobCategoriesResponse> {
		const [totalCount, itemList ] = await Promise.all([
			this.jobCategoryService.getTotalCount(),
			this.jobCategoryService.getJobCategories(query.parent_id)
		])
		const definedList = itemList.map((item) => this.jobCategoryService.definedJobCategoryModel(item))
		return {
			total_count: totalCount, item_list: definedList
		}
	}

	@Get(':id(\\d+)')
	async getJobCategory(@Param('id') id: number) {
		const jobCategory = await this.jobCategoryService.getJobCategory(id)
		if (!jobCategory) {
			throw new CustomError(GetJobCategoriesDetailErrorCode.NOT_FOUND)
		}
		return this.jobCategoryService.definedJobCategoryModel(jobCategory)
	}

	@Post()
	async createJobCategory(@Body() body: PostJobCategoriesRequest) {
		await this.jobCategoryService.createJobCategory(body.name, body.parent_id)
		return true
	}

	@Put(':id(\\d+)')
	async updateJobCategory(@Param('id') id: number, @Body() body: PutJobCategoriesDetailRequest) {
		await this.jobCategoryService.updateJobCategory(id, body.name)
		return true
	}

	@Delete(':id(\\d+)')
	async deleteJobCategory(@Param('id') id: number) {
		// 삭제안된 자식이 있을경우 삭제 안되도록 처리
		await this.jobCategoryService.deleteJobCategory(id)
		return true
	}
}
