import { IsDefined, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator'

export class JobCategoryModel {
	constructor(
		id: number,
		name: string,
		depth: number
	) {
		this.id = id
		this.name = name
		this.depth = depth
	}
	id: number
	name: string
	depth: number
}

export class GetJobCategoriesRequest {
	@IsNumberString()
	@IsOptional()
	parent_id?: number
}

export class GetJobCategoriesResponse {
	item_list: JobCategoryModel[]
	total_count: number
}

export class PutJobCategoriesDetailRequest {
	@IsString()
	@IsDefined()
	name: string
}

export class PostJobCategoriesRequest {
	@IsString()
	@IsDefined()
	name: string

	@IsNumber()
	@IsOptional()
	parent_id?: number | null
}

export class GetJobCategoriesDetailResponse {
	item: JobCategoryModel
}
