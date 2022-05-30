import { Injectable } from '@nestjs/common'
import { SkillCategoryModel } from '@recruit/interface'
import { SkillCategory } from 'src/entities/SkillCategory'
import { SkillCategoryRepository } from 'src/repositories/SkillCategoryRepository'

@Injectable()
export class SkillCategoryService {
	constructor(
		private readonly skillCategoryRepository: SkillCategoryRepository,
	) {}

	defineSkillCategoryModel(skillCategory: SkillCategory) {
		return new SkillCategoryModel(skillCategory.id, skillCategory.name)
	}

	async deleteSkillCategory(id: number) {
		await this.skillCategoryRepository.softDelete(id)
	}

	async createSkillCategory(name: string) {
		const skillCategory = this.skillCategoryRepository.create()
		skillCategory.name = name
		return await this.skillCategoryRepository.save(skillCategory)
	}

	async updateSkillCategory(id: number, name: string) {
		await this.skillCategoryRepository.createQueryBuilder()
			.update()
			.set({ name })
			.where({ id })
			.execute()
	}

	async getSkillCategoryByName(name: string) {
		return this.skillCategoryRepository.findOne({
			where: {
				name
			}
		})
	}

	async getSkillCategoryById(skillCategoryId: number) {
		return this.skillCategoryRepository.findOne(skillCategoryId)
	}

	async getSkillCategories() {
		return this.skillCategoryRepository.find()
	}
}