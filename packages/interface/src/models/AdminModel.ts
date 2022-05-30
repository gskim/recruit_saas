import { Type } from 'class-transformer'
import { IsArray, IsDefined, IsEnum, IsMobilePhone, IsNumber, IsNumberString, IsOptional, IsString, Matches } from 'class-validator'

export enum AdminStatus {
	WAIT = 'WAIT',
	REJECT = 'REJECT',
	APPROVE = 'APPROVE',
	DELETE = 'DELETE'
}

export enum AdminRole {
	ADMIN = 'ADMIN',
	NORMAL = 'NORMAL',
}

export class AdminModel {
	constructor(
		id: number,
		nickname: string | null,
		email: string,
		profile_image: string | null,
		phone: string | null,
		status: AdminStatus,
		roles: AdminRole[],
	) {
		this.id = id
		this.nickname = nickname
		this.email = email
		this.profile_image = profile_image
		this.phone = phone
		this.status = status
		this.roles = roles
	}
	id: number
	nickname: string | null
	email: string
	profile_image: string | null
	phone: string | null
	status: AdminStatus
	roles: AdminRole[]
}

export class GetAdminsRequest {
	@IsNumberString()
	@IsDefined()
	skip: number

	@IsNumberString()
	@IsDefined()
	limit: number

	@IsOptional()
	@IsEnum(AdminStatus)
	status?: AdminStatus | null

	@IsOptional()
	@IsString()
	nickname?: string

	@IsOptional()
	@IsString()
	email?: string
}

export class GetAdminsResponse {
	item_list: AdminModel[]
	total_count: number
}

export class PutAdminsDetailRequest {
	@IsString()
	@IsOptional()
	nickname: string | null

	@IsMobilePhone('ko-KR')
	@IsOptional()
	phone: string | null

	@IsDefined()
	@IsEnum(AdminRole, { each: true })
	roles: AdminRole[]

	@IsDefined()
	@IsEnum(AdminStatus)
	status: AdminStatus

	@IsOptional()
	@IsString()
	profile_image: string | null
}

export class GetAdminsDetailResponse {
	item: AdminModel
}

export enum AdminProfileImageFileType {
	JPG = 'JPG',
	PNG = 'PNG',
}

export class PostAdminsDetailProfileImageRequest {
	@IsEnum(AdminProfileImageFileType)
	@IsDefined()
	type: AdminProfileImageFileType
}

export class PostAdminsDetailProfileImageResponse {
	url: string
	key: string
}