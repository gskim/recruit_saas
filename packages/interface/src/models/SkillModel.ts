import { Type } from 'class-transformer'
import { IsArray, IsDefined, IsEnum, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator'


export class SkillCategoryModel {
	constructor(
		id: number,
		name: string
	) {
		this.id = id
		this.name = name
	}
	id: number
	name: string
}

export class SkillModel {
	constructor(
		id: number,
		name: string,
		alias: string[],
		image_key: string | null,
		description: string | null,
		website_url: string | null,
		skill_category: SkillCategoryModel,

	) {
		this.id = id
		this.name = name
		this.alias = alias
		this.image_key = image_key
		this.description = description
		this.website_url = website_url
		this.skill_category = skill_category
	}
	id: number
	name: string
	alias: string[]
	image_key: string | null
	description: string | null
	website_url: string | null
	skill_category: SkillCategoryModel
}

export class GetSkillsRequest {

	@IsNumberString()
	@IsOptional()
	skill_category_id?: number

	@IsOptional()
	@IsString()
	alias?: string

	@IsNumberString()
	@IsDefined()
	skip: number

	@IsNumberString()
	@IsDefined()
	limit: number
}

export class GetSkillCategoriesResponse {
	item_list: SkillCategoryModel[]
}

export class GetSkillsResponse {
	item_list: SkillModel[]
	total_count: number
}

export class GetSkillsDetailResponse {
	item: SkillModel
}

export class PostSkillCategoriesRequest {
	@IsString()
	@IsDefined()
	name: string
}

export class PutSkillCategoriesDetailRequest {
	@IsString()
	@IsDefined()
	name: string
}

export class PostSkillsRequest {
	@IsString()
	@IsDefined()
	name: string

	@IsArray()
	@Type(() => String)
	@IsDefined()
	alias: string[]

	@IsString()
	@IsOptional()
	image_key: string | null

	@IsString()
	@IsOptional()
	description: string | null

	@IsString()
	@IsOptional()
	website_url: string | null

	@IsNumber()
	@IsDefined()
	skill_category_id: number
}

export class PutSkillsDetailRequest {
	@IsString()
	@IsDefined()
	name: string

	@IsArray()
	@Type(() => String)
	@IsDefined()
	alias: string[]

	@IsString()
	@IsOptional()
	image_key: string | null

	@IsString()
	@IsOptional()
	description: string | null

	@IsString()
	@IsOptional()
	website_url: string | null

	@IsNumber()
	@IsDefined()
	skill_category_id: number
}

export enum SkillImageFileType {
	JPG = 'JPG',
	PNG = 'PNG',
}

export class PostSkillsDetailImageRequest {
	@IsEnum(SkillImageFileType)
	@IsDefined()
	type: SkillImageFileType
}

export class PostSkillsDetailImageResponse {
	url: string
	key: string
}