import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common'
import { PostSkillCategoriesRequest, PostSkillCategoriesErrorCode, PutSkillCategoriesDetailRequest,
	GetSkillCategoriesResponse } from '@recruit/interface'
import { CustomError } from 'src/CustomError'
import { SkillCategoryService } from 'src/services/SkillCategoryService'

@Controller('skill_categories')
export class SkillCategoryController {

	@Inject() private readonly skillCategoryService: SkillCategoryService

	@Post()
	async createSkillCategory(@Body() body: PostSkillCategoriesRequest) {
		const existSkillCategory = await this.skillCategoryService.getSkillCategoryByName(body.name)
		if (existSkillCategory) {
			throw new CustomError(PostSkillCategoriesErrorCode.EXIST_SKILL_CATEGORY)
		}
		await this.skillCategoryService.createSkillCategory(body.name)
		return true
	}

	@Put(':id(\\d+)')
	async updateSkillCategory(@Param('id') id: number, @Body() body: PutSkillCategoriesDetailRequest) {
		const existSkillCategory = await this.skillCategoryService.getSkillCategoryByName(body.name)
		if (existSkillCategory) {
			throw new CustomError(PostSkillCategoriesErrorCode.EXIST_SKILL_CATEGORY)
		}
		await this.skillCategoryService.updateSkillCategory(id, body.name)
		return true
	}

	@Delete(':id(\\d+)')
	async deleteSkillCategory(@Param('id') id: number) {
		await this.skillCategoryService.deleteSkillCategory(id)
		return true
	}

	@Get()
	async getSkillCategories(): Promise<GetSkillCategoriesResponse> {
		const itemList = await this.skillCategoryService.getSkillCategories()
		const definedItemList = itemList.map((item) => this.skillCategoryService.defineSkillCategoryModel(item))
		return { item_list: definedItemList }
	}


}
