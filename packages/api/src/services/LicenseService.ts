import { Injectable } from '@nestjs/common'
import { LicenseRepository } from 'src/repositories/LicenseRepository'

@Injectable()
export class LicenseService {
	constructor(
		private readonly licenseRepository: LicenseRepository,
	) {}

	async getLicenses(skip: number, limit: number, name?: string | null, type?: string | null, organization?: string | null) {
		return this.licenseRepository.findByFilter(skip, limit, name, type, organization)
	}

	async updateLicense(id: number, name: string, type: string, organization: string) {
		await this.licenseRepository.createQueryBuilder()
			.update()
			.set({ name, type, organization })
			.where({ id })
			.execute()
	}

	async addLicese(name: string, type: string, organization: string) {
		await this.licenseRepository.save({
			name, type, organization
		})
	}

	async deleteLicense(id: number) {
		await this.licenseRepository.softDelete(id)
	}

	async getByName(name: string) {
		return this.licenseRepository.findOne({ where: { name } })
	}

	async addLicenseForMigation(id: number, type: string, name: string, organization: string) {
		await this.licenseRepository.save({
			id, type, name, organization
		})
	}

}