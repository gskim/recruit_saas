import { IsArray, IsDefined, IsEnum, IsMobilePhone, IsNumber, IsNumberString, IsOptional, IsString, Matches } from 'class-validator'


export class SchoolModel {
	constructor(
		id: number,
		name: string,
		category1: string,
		category2: string,

	) {
		this.id = id
		this.name = name
		this.category1 = category1
		this.category2 = category2
	}
	id: number
	name: string
	category1: string
	category2: string
}

export class GetSchoolsRequest {
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
	category1?: string | null

	@IsOptional()
	@IsString()
	category2?: string | null
}

export class GetSchoolsResponse {
	item_list: SchoolModel[]
	total_count: number
}

export class PutSchoolsDetailRequest {
	@IsString()
	@IsDefined()
	name: string

	@IsString()
	@IsDefined()
	category1: string

	@IsString()
	@IsDefined()
	category2: string
}

export class PostSchoolsRequest {
	@IsString()
	@IsDefined()
	name: string

	@IsString()
	@IsDefined()
	category1: string

	@IsString()
	@IsDefined()
	category2: string
}