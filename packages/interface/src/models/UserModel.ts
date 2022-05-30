import { IsDefined, IsEmail, IsMobilePhone, IsNumberString, IsString } from 'class-validator'

export enum UserStatus {
	OPEN = 'OPEN',
	DELETE = 'DELETE'
}

export class UserModel {
	constructor(
		id: number,
		email: string,
		status: UserStatus
	) {
		this.id = id
		this.email = email
		this.status = status
	}
	id: number
	email: string
	status: UserStatus
}

export class GetUsersRequest {
	@IsNumberString()
	@IsDefined()
	skip: number

	@IsNumberString()
	@IsDefined()
	limit: number
}

export class GetUsersResponse {
	item_list: UserModel[]
	total_count: number
}

export class PostUsersRequest {

	// @IsString()
	// @IsDefined()
	// name: string

	// @IsMobilePhone('ko-KR')
	// @IsDefined()
	// phone: string

	@IsEmail()
	email: string
}

export class PutUsersDetailRequest {
	// @IsMobilePhone('ko-KR')
	// @IsDefined()
	// phone: string

	@IsEmail()
	@IsDefined()
	email: string
}

export class GetUsersDetailResponse {
	item: UserModel
}