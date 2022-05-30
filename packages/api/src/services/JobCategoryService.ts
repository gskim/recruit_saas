import { Injectable } from '@nestjs/common'
import { JobCategoryModel, PostJobCategoriesErrorCode } from '@recruit/interface'
import { CustomError } from 'src/CustomError'
import { JobCategory } from 'src/entities/JobCategory'
import { JobCategoryRepository } from 'src/repositories/JobCategoryRepository'
import { In } from 'typeorm'

@Injectable()
export class JobCategoryService {
	constructor(private readonly jobCategoryRepository: JobCategoryRepository) {}

	definedJobCategoryModel(jobCategory: JobCategory) {
		return new JobCategoryModel(jobCategory.id, jobCategory.name, jobCategory.depth )
	}

	async getTotalCount(parentId?: number) {
		const query = this.jobCategoryRepository.createQueryBuilder()

		if (parentId) {
			query.andWhere({ parentId })
		} else {
			query.andWhere('parent_id IS NULL')
		}


		return query.getCount()
	}

	async getJobCategories(parentId?: number) {
		const query = this.jobCategoryRepository.createQueryBuilder()

		if (parentId) {
			query.andWhere({ parentId })
		} else {
			query.andWhere('parent_id IS NULL')
		}

		return query.getMany()
	}

	async getJobCategory(id: number) {
		return this.jobCategoryRepository.findOne(id)
	}

	async getJobCategoryByIds(ids: number[]) {
		return this.jobCategoryRepository.find({ where: { id: In(ids) } })
	}

	async createJobCategory(name: string, parent_id?: number) {
		const jobCategory = this.jobCategoryRepository.create()
		jobCategory.name = name
		jobCategory.depth = 0
		if (parent_id) {
			const parent = await this.jobCategoryRepository.findOne(parent_id)
			if (!parent) {
				throw new CustomError(PostJobCategoriesErrorCode.NOT_FOUND_PARENT)
			}
			jobCategory.depth = parent.depth + 1
			jobCategory.parent = parent
		}
		return await this.jobCategoryRepository.save(jobCategory)
	}

	async updateJobCategory(id: number, name: string) {
		await this.jobCategoryRepository.createQueryBuilder()
			.update()
			.set({ name })
			.where({ id })
			.execute()
		return true
	}

	async deleteJobCategory(id: number) {
		await this.jobCategoryRepository.softDelete(id)
	}

	async findByIds(ids: number[]) {
		return await this.jobCategoryRepository.findByIds(ids)
	}

}