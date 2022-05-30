import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AdminStatus } from '@recruit/interface'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Admin } from 'src/entities/Admin'
import { jwtConstants } from '../Constants'
import { AdminService } from './AdminService'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

	@Inject() private readonly adminService: AdminService

	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConstants.secret
		})
	}

	async validate(payload: Admin) {
		const user = await this.adminService.findOneByAccessToken(payload.id, payload.accessToken)
		if (!user) throw new UnauthorizedException('유효하지 않은 로그인입니다. 다시 로그인을 시도해주세요.')
		if (user.status !== AdminStatus.APPROVE) {
			throw new UnauthorizedException('유효하지 않은 로그인입니다. 다시 로그인을 시도해주세요.')
		}
		return user
	}
}
