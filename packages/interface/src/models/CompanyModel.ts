import { Type } from 'class-transformer'
import { IsArray, IsDefined, IsEmail, IsEnum, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator'

export class CompanySkillModel {
	skill_category_id: number
	skill_id_list: number[]
}

export enum CompanyStatus {
	OPEN = 'OPEN',
	CLOSE = 'CLOSE',
}
export class CompanyModel {
	constructor(
		id: number,
		name_ko: string,
		name_en: string,
		address: string,
		status: CompanyStatus,
		email: string | null,
		tel: string | null,
		logo_img_url: string | null,
	) {
		this.id = id
		this.name_ko = name_ko
		this.name_en = name_en
		this.address = address
		this.status = status
		this.email = email
		this.tel = tel
		this.logo_img_url = logo_img_url
	}
	id: number
	name_ko: string
	name_en: string
	address: string
	status: CompanyStatus
	email: string | null
	tel: string | null
	logo_img_url: string | null
}

export class GetCompaniesRequest {
	@IsNumberString()
	@IsDefined()
	skip: number

	@IsNumberString()
	@IsDefined()
	limit: number

	@IsOptional()
	@IsString()
	name: string | null
}

export class GetCompaniesResponse {
	item_list: CompanyModel[]
	total_count: number
}

export class PutCompaniesDetailRequest {
	@IsString()
	@IsDefined()
	name_ko: string

	@IsString()
	@IsDefined()
	name_en: string

	@IsString()
	@IsDefined()
	address: string

	@IsEmail()
	@IsOptional()
	email: string | null

	@IsString()
	@IsOptional()
	tel: string | null

	@IsString()
	@IsOptional()
	logo_img_url: string | null
}

export class PostCompaniesRequest {
	@IsString()
	@IsDefined()
	name_ko: string

	@IsString()
	@IsDefined()
	name_en: string

	@IsString()
	@IsDefined()
	address: string

	@IsEmail()
	@IsOptional()
	email: string | null

	@IsString()
	@IsOptional()
	tel: string | null

	@IsString()
	@IsOptional()
	logo_img_url: string | null
}

export class GetCompaniesDetailResponse {
	item: CompanyModel
}

export class PutCompaniesDetailSkillsRequest {
	@IsDefined()
	@IsArray()
	@Type(() => CompanySkillModel)
	skill_list: CompanySkillModel[]
}

export class GetCompaniesDetailSkillsResponse {
	item_list: CompanySkillModel[]
}

export enum CompanyLogoImageFileType {
	JPG = 'JPG',
	PNG = 'PNG',
}

export class PostCompaniesDetailLogoImageRequest {
	@IsEnum(CompanyLogoImageFileType)
	@IsDefined()
	type: CompanyLogoImageFileType
}

export class PostCompaniesDetailLogoImageResponse {
	url: string
	key: string
}
