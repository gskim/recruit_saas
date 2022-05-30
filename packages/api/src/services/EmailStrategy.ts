import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AdminStatus, AuthsLoginErrorCode } from '@recruit/interface'
import { Strategy } from 'passport-local'
import { CustomError } from 'src/CustomError'
import { Admin } from 'src/entities/Admin'
import { AdminAuthService } from './AdminAuthService'

@Injectable()
export class EmailStrategy extends PassportStrategy(Strategy, 'email') {

	constructor(private readonly adminAuthService: AdminAuthService) {
		super({ usernameField: 'email',passwordField: 'password' })
  	}

	async validate(email: string, password: string): Promise<Admin> {
		const user = await this.adminAuthService.getUser(email)
		if (!user) {
			throw new CustomError(AuthsLoginErrorCode.NOT_EXIST_EMAIL, '등록되어있지않은 이메일입니다.')
		}
		if (user.comparePassword(password)) {
			if (user.status === AdminStatus.DELETE) {
				throw new CustomError(AuthsLoginErrorCode.DELETE_USER, '삭제된 계정입니다.')
			}
			if (user.status !== AdminStatus.APPROVE) {
				throw new CustomError(AuthsLoginErrorCode.NOT_APPROVE, '승인되지않은 계정입니다.')
			}
			return user
		} else {
			throw new CustomError(AuthsLoginErrorCode.WRONG_PASSWORD, '비밀번호가 올바르지않습니다.')
		}
	}
}