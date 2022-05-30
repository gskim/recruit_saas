import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common'
import { PostSkillsErrorCode, PostSkillsRequest, PutSkillsDetailRequest, PutSkillsDetailErrorCode,
	GetSkillsRequest, GetSkillsResponse, GetSkillsDetailResponse, GetSkillsDetailErrorCode,
	PostSkillsDetailImageRequest, PostSkillsDetailImageResponse } from '@recruit/interface'
import { CustomError } from 'src/CustomError'
import { FileService } from 'src/services/FileService'
import { SkillCategoryService } from 'src/services/SkillCategoryService'
import { SkillService } from 'src/services/SkillService'

@Controller('skills')
export class SkillController {

	@Inject() private readonly skillService: SkillService
	@Inject() private readonly fileService: FileService
	@Inject() private readonly skillCategoryService: SkillCategoryService

	@Get()
	async getSkills(@Query() query: GetSkillsRequest): Promise<GetSkillsResponse> {
		const [itemList, totalCount] = await this.skillService.getSkills(query.skip, query.limit, query.skill_category_id, query.alias)
		const definedItemList = itemList.map((item) => this.skillService.defineSkillModel(item))
		return {
			item_list: definedItemList, total_count: totalCount
		}
	}

	@Get(':id(\\d+)')
	async getSkill(@Param('id') id: number): Promise<GetSkillsDetailResponse> {
		const skill = await this.skillService.getSkill(id)
		if (!skill) {
			throw new CustomError(GetSkillsDetailErrorCode.NOT_FOUND)
		}
		return {
			item: this.skillService.defineSkillModel(skill)
		}
	}


	@Post()
	async createSkill(@Body() body: PostSkillsRequest) {
		const skillCategory = await this.skillCategoryService.getSkillCategoryById(body.skill_category_id)
		if (!skillCategory) {
			throw new CustomError(PostSkillsErrorCode.NOT_FOUND_SKILL_CATEGORY)
		}
		const existSkill = await this.skillService.getSkillByNameAndCategoryId(body.name, body.skill_category_id)
		if (existSkill) {
			throw new CustomError(PostSkillsErrorCode.EXIST_SKILL)
		}
		await this.skillService.createSkill(body.skill_category_id, body.name, body.alias, body.description,
			body.website_url, body.image_key)
	}

	@Put(':id(\\d+)')
	async updateSkill(@Param('id') id: number, @Body() body: PutSkillsDetailRequest) {
		const skillCategory = await this.skillCategoryService.getSkillCategoryById(body.skill_category_id)
		if (!skillCategory) {
			throw new CustomError(PutSkillsDetailErrorCode.NOT_FOUND_SKILL_CATEGORY)
		}
		await this.skillService.updateSkill(
			id, body.name, body.skill_category_id, body.alias, body.description, body.website_url, body.image_key
		)
		return true
	}

	@Delete(':id(\\d+)')
	async deleteSkill(@Param('id') id: number) {
		await this.skillService.deleteSkill(id)
		return true
	}

	@Post('image')
	async profileImagePresignedUrl(@Body() body: PostSkillsDetailImageRequest): Promise<PostSkillsDetailImageResponse> {
		return await this.fileService.skillImagePresignedUrl(body.type)
	}

}
