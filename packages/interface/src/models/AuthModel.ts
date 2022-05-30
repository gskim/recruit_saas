import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { AdminModel } from './AdminModel'

export class PostAuthsLoginResponse {
	token: string
	admin: AdminModel
}

export class PostAuthsLoginRequest {
	@IsEmail()
	@IsDefined()
	email: string

	@IsString()
	@IsDefined()
	@IsNotEmpty()
	password: string
}

export class PostAuthsSignupRequest {
	@IsEmail()
	@IsDefined()
	email: string

	@IsString()
	@IsDefined()
	@IsNotEmpty()
	password: string
}

export class GetAuthsMeResponse {
	item: AdminModel
}
