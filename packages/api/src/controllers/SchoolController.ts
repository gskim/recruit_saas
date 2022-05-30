import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common'
import { GetSchoolsRequest, GetSchoolsResponse, PostSchoolsErrorCode, PostSchoolsRequest, PutSchoolsDetailRequest,
	PutSchoolsErrorCode } from '@recruit/interface'
import { CustomError } from 'src/CustomError'
import { SchoolService } from 'src/services/SchoolService'

@Controller('schools')
export class SchoolController {

	@Inject() private readonly schoolService: SchoolService

	@Get()
	async getSchools(@Query() query: GetSchoolsRequest): Promise<GetSchoolsResponse> {
		const [itemList, totalCount] = await this.schoolService.getSchools(query.skip, query.limit,
			query.name, query.category1, query.category2)
		return {
			item_list: itemList, total_count: totalCount
		}
	}

	@Put(':id(\\d+)')
	async updateSchool(@Param('id') id: number, @Body() body: PutSchoolsDetailRequest) {
		const existSchool = await this.schoolService.getByName(body.name)
		if (existSchool) {
			throw new CustomError(PutSchoolsErrorCode.EXIST_SCHOOL)
		}
		await this.schoolService.updateSchool(id, body.name, body.category1, body.category2)
		return true
	}


	@Delete(':id(\\d+)')
	async deleteSchool(@Param('id') id: number) {
		await this.schoolService.deleteSchool(id)
		return true
	}

	@Post()
	async addSchool(@Body() body: PostSchoolsRequest) {
		const existSchool = await this.schoolService.getByName(body.name)
		if (existSchool) {
			throw new CustomError(PostSchoolsErrorCode.EXIST_SCHOOL)
		}
		await this.schoolService.addSchool(body.name, body.category1, body.category2)
		return true
	}
}