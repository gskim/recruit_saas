import { Injectable } from '@nestjs/common'
import { SchoolRepository } from 'src/repositories/SchoolRepository'

@Injectable()
export class SchoolService {
	constructor(
		private readonly schoolRepository: SchoolRepository,
	) {}

	async getSchools(skip: number, limit: number, name?: string | null, category1?: string | null, category2?: string | null) {
		return this.schoolRepository.findByFilter(skip, limit, name, category1, category2)
	}

	async updateSchool(id: number, name: string, category1: string, category2: string) {
		await this.schoolRepository.createQueryBuilder()
			.update()
			.set({
				name, category1, category2
			})
			.where({ id })
			.execute()
	}

	async deleteSchool(id: number) {
		await this.schoolRepository.softDelete(id)
	}

	async getByName(name: string) {
		return this.schoolRepository.findOne({ where: { name } })
	}

	async addSchool(category1: string, category2: string, name: string) {
		await this.schoolRepository.save({ category1, category2, name })
	}

	async addSchoolForMigration(category1: string, category2: string, name: string) {
		const school = await this.schoolRepository.findOne({ where: { name } })
		if (!school) {
			await this.schoolRepository.save({ category1, category2, name })
		}
	}
}