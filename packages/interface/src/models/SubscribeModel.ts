import { IsDefined, IsNumber, IsNumberString, IsOptional, IsString, Length, Min } from 'class-validator'
import { CompanyModel } from './CompanyModel'

export enum SubscribePolicyType {
	BASIC = 'BASIC',
	PREMIUM = 'PREMIUM'
}

export class SubscribePolicyModel {
	constructor(
		id: number,
		name: string,
		type: SubscribePolicyType,
		price: number,
	) {
		this.id = id
		this.name = name
		this.type = type
		this.price = price
	}
	id: number
	name: string
	type: SubscribePolicyType
	price: number
}

export class SubscribeModel {
	constructor(
		id: number,
		subscribe_policy: SubscribePolicyModel,
		company: CompanyModel,
		started_at: Date,
		ended_at: Date,
		price: number,
		memo: string | null
	) {
		this.id = id
		this.subscribe_policy = subscribe_policy
		this.company = company
		this.started_at = started_at
		this.ended_at = ended_at
		this.price = price
		this.memo = memo
	}
	id: number
	subscribe_policy: SubscribePolicyModel
	company: CompanyModel
	started_at: Date
	ended_at: Date
	price: number
	memo: string | null
}

export class GetSubscribesRequest {
	@IsNumberString()
	@IsDefined()
	skip: number

	@IsNumberString()
	@IsDefined()
	limit: number

	@IsNumberString()
	@IsOptional()
	company_id: number | null
}

export class GetSubscribePoliciesResponse {
	item_list: SubscribePolicyModel[]
}

export class GetSubscribesResponse {
	item_list: SubscribeModel[]
	total_count: number
}

export class PostSubscribesRequest {
	@IsNumber()
	@IsDefined()
	company_id: number

	@IsNumber()
	@IsDefined()
	subscribe_policy_id: number

	@IsNumber()
	@IsDefined()
	started_at: number

	@IsNumber()
	@IsDefined()
	ended_at: number

	@IsNumber()
	@Min(0)
	@IsDefined()
	price: number

	@IsString()
	@IsOptional()
	memo: string | null
}

export class PutSubscribesRequest {

	@IsNumber()
	@IsDefined()
	subscribe_policy_id: number

	@IsNumber()
	@IsDefined()
	started_at: number

	@IsNumber()
	@IsDefined()
	ended_at: number

	@IsNumber()
	@IsDefined()
	price: number

	@IsString()
	@IsOptional()
	memo: string | null
}


export class GetSubscribesDetailResponse {
	item: SubscribeModel
}
