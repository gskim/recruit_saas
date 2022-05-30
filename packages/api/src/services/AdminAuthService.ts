import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Admin } from 'src/entities/Admin'
import Crypto from 'src/utils/Crypto'
import { AdminService } from './AdminService'

@Injectable()
export class AdminAuthService {
	@Inject() private readonly adminService: AdminService
	@Inject() private readonly jwtService: JwtService

	async getUser(email: string) {
		return await this.adminService.findOneByEmail(email)
	}

	getJWT(admin: Admin) {
		const payload = { id: admin.id, accessToken: admin.accessToken }
		return this.jwtService.sign(payload)
	}

	async updateLoginDateAndToken(admin: Admin) {
		const accessToken = Crypto.genToken()
		admin.accessToken = accessToken
		await this.adminService.updateAdmin(admin)
		return accessToken
	}
}