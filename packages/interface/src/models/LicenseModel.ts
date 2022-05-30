import { IsArray, IsDefined, IsEnum, IsMobilePhone, IsNumber, IsNumberString, IsOptional, IsString, Matches } from 'class-validator'


export class LicenseModel {
	constructor(
		id: number,
		type: string,
		name: string,
		organization: string,

	) {
		this.id = id
		this.name = name
		this.type = type
		this.organization = organization
	}
	id: number
	type: string
	name: string
	organization: string
}

export class GetLicensesRequest {
	@IsNumberString()
	@IsDefined()
	skip: number

	@IsNumberString()
	@IsDefined()
	limit: number

	@IsOptional()
	@IsString()
	name?: string | null

	@IsOptional()
	@IsString()
	type?: string | null

	@IsOptional()
	@IsString()
	organization?: string | null
}

export class GetLicensesResponse {
	item_list: LicenseModel[]
	total_count: number
}

export class PutLicensesDetailRequest {
	@IsString()
	@IsDefined()
	name: string

	@IsString()
	@IsDefined()
	type: string

	@IsString()
	@IsDefined()
	organization: string
}

export class PostLicensesRequest {
	@IsString()
	@IsDefined()
	name: string

	@IsString()
	@IsDefined()
	type: string

	@IsString()
	@IsDefined()
	organization: string
}