import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class EmailAuthGuard extends AuthGuard('email') {
	handleRequest(err: any, user: any, info: any) {
		if (err || !user) {
			throw err || new UnauthorizedException('유효하지 않은 로그인입니다. 다시 로그인을 시도해주세요.')
		}
		return user
	}
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private readonly reflector: Reflector) {
		super()
	}
	canActivate(context: ExecutionContext) {
		return super.canActivate(context)
	}

	handleRequest(err: any, user: any, info: any) {
		if (err || !user) {
			throw err || new UnauthorizedException('유효하지 않은 로그인입니다. 다시 로그인을 시도해주세요.')
		}
		return user
	}
}