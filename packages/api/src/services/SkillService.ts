import { Injectable } from '@nestjs/common'
import { SkillCategoryModel, SkillModel } from '@recruit/interface'
import { Skill } from 'src/entities/Skill'
import { SkillRepository } from 'src/repositories/SkillRepository'
import { In } from 'typeorm'

@Injectable()
export class SkillService {
	constructor(
		private readonly skillRepository: SkillRepository,
	) {}

	defineSkillModel(skill: Skill) {
		const skillCategoryModel = new SkillCategoryModel(skill.skillCategory.id, skill.skillCategory.name)
		return new SkillModel(skill.id, skill.name, skill.alias, skill.imageKey, skill.description, skill.websiteUrl, skillCategoryModel)
	}

	async getSkill(id: number) {
		return this.skillRepository.findOne(id, { relations: ['skillCategory'] })
	}

	async getSkills(skip: number, limit: number, skillCategoryId?: number, alias?: string, ) {
		const query = this.skillRepository.createQueryBuilder('skill')
			.leftJoinAndSelect('skill.skillCategory', 'skillCategory')
			.skip(skip)
			.take(limit)

		if (skillCategoryId) {
			query.andWhere('skill.skill_category_id = :skillCategoryId', { skillCategoryId })
		}
		if (alias) {
			query.andWhere("JSON_EXTRACT(alias, '$') LIKE :alias", { alias: `%${alias}%` })
		}
		return query.getManyAndCount()
	}

	async getSkillsByIds(ids: number[]) {
		return this.skillRepository.find({
			relations: ['skillCategory'],
			where: {
				id: In(ids)
			}
		})
	}

	async deleteSkill(id: number) {
		await this.skillRepository.softDelete(id)
	}

	async updateSkill(id: number, name: string, skillCategoryId: number, alias: string[],
		description: string | null, websiteUrl: string | null, imageKey: string | null) {
		await this.skillRepository.createQueryBuilder()
			.update()
			.set({
				name, skillCategoryId, alias, description, websiteUrl, imageKey
			})
			.where({ id })
			.execute()
	}

	async getSkillByNameAndCategoryId(name: string, skillCategoryId: number) {
		return this.skillRepository.findOne({
			where: {
				name, skillCategoryId
			}
		})
	}

	async createSkill(skillCategoryId: number, name: string, alias: string[],
		description: string | null, websiteUrl: string | null, imageKey: string | null) {
		const skill = this.skillRepository.create()
		skill.name = name
		skill.alias = alias
		skill.skillCategoryId = skillCategoryId
		skill.description = description
		skill.websiteUrl = websiteUrl
		skill.imageKey = imageKey
		await this.skillRepository.save(skill)
	}

}