import { Injectable } from '@nestjs/common'
import { CompanyModel, CompanySkillModel, CompanyStatus } from '@recruit/interface'
import { Company } from 'src/entities/Company'
import { CompanyRepository } from 'src/repositories/CompanyRepository'

@Injectable()
export class CompanyService {

	private readonly S3_URL = 'https://recruit.s3.ap-northeast-2.amazonaws.com/'

	constructor(private readonly companyRepository: CompanyRepository) {}

	defineCompanyModel(company: Company) {
		const imageUrl = company.logoImgUrl ? this.S3_URL + company.logoImgUrl : null
		return new CompanyModel(company.id, company.name_ko, company.name_en,
			company.address, company.status, company.email, company.tel, imageUrl)
	}

	async findByFilter(skip: number, limit: number, name: string | null) {
		const query = this.companyRepository.createQueryBuilder()
			.skip(skip)
			.take(limit)
		if (name) {
			query.andWhere('name_ko LIKE :name', { name: `%${name}%` })
		}
		return await query.getManyAndCount()

	}

	async getOne(companyId: number) {
		return this.companyRepository.findOne(companyId)
	}

	async create(name_ko: string, name_en: string, address: string, email: string | null,
		tel: string | null, logoImgUrl: string | null) {
		const company = this.companyRepository.create()
		company.name_ko = name_ko
		company.name_en = name_en
		company.address = address
		company.skill_list = []
		company.email = email
		company.tel = tel
		company.logoImgUrl = logoImgUrl
		await this.companyRepository.save(company)
	}

	async update(companyId: number, name_ko: string, name_en: string, address: string,
		email: string | null, tel: string | null, logoImgUrl: string | null) {
		await this.companyRepository.createQueryBuilder()
			.update()
			.set({
				name_ko: name_ko,
				name_en: name_en,
				address, email, tel,
				logoImgUrl,
			})
			.where({ id: companyId })
			.execute()
	}

	async delete(companyId: number) {
		await this.companyRepository.createQueryBuilder()
			.update()
			.set({
				status: CompanyStatus.CLOSE,
			})
			.where({ id: companyId })
			.execute()
	}

	async updateSkillList(companyId: number, skillModel: CompanySkillModel[]) {
		await this.companyRepository.createQueryBuilder()
			.update()
			.set({
				skill_list: skillModel
			})
			.where({ id: companyId })
			.execute()
	}
}