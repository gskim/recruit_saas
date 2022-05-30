import { Injectable } from '@nestjs/common'
import { CompanyModel, SubscribeModel, SubscribePolicyModel } from '@recruit/interface'
import { Company } from 'src/entities/Company'
import { Subscribe } from 'src/entities/Subscribe'
import { SubscribeRepository } from 'src/repositories/SubscribeRepository'


@Injectable()
export class SubscribeService {
	constructor(private readonly subscribeRepository: SubscribeRepository) {}

	defineSubscribeModel(subscribe: Subscribe, subscribePolicy: SubscribePolicyModel) {
		const company = subscribe.company
		const companyModel = new CompanyModel(company.id, company.name_ko, company.name_en,
			company.address, company.status, company.email, company.tel, company.logoImgUrl)
		return new SubscribeModel(subscribe.id, subscribePolicy, companyModel, subscribe.startedAt, subscribe.endedAt,
			subscribe.price,subscribe.memo)
	}

	async createSubscribe(company: Company, subscribePolicy: SubscribePolicyModel, startedAt: number, endedAt: number, price: number,
		memo: string | null, adminId: number) {
		const subscribe = this.subscribeRepository.create()
		subscribe.company = company
		subscribe.subscribePolicyId = subscribePolicy.id
		subscribe.startedAt = new Date(startedAt)
		subscribe.endedAt = new Date(endedAt)
		subscribe.memo = memo
		subscribe.price = price
		subscribe.createdAdminId = adminId
		subscribe.updatedAdminId = adminId
		await this.subscribeRepository.save(subscribe)
		return true
	}

	async updateSubscribe(id: number, subscribePolicy: SubscribePolicyModel, startedAt: number, endedAt: number,
		memo: string | null, adminId: number) {
		await this.subscribeRepository.createQueryBuilder()
			.update()
			.set({
				subscribePolicyId: subscribePolicy.id,
				startedAt: new Date(startedAt), endedAt: new Date(endedAt), memo,
				updatedAdminId: adminId
			})
			.where({ id })
			.execute()
		return true
	}

	async getSubscribe(id: number) {
		return this.subscribeRepository.findOne(id, { relations: ['company'] })
	}

	async getSubscribes(skip: number, limit: number, companyId: number | null) {
		const query = this.subscribeRepository.createQueryBuilder('subscribe')
			.leftJoinAndSelect('subscribe.company', 'company')
			.skip(skip).take(limit)
			.orderBy('subscribe.id', 'DESC')
		if (companyId) {
			query.andWhere('company_id = :companyId', { companyId })
		}
		return query.getManyAndCount()
	}

}