import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common'
import { GetAuthsMeResponse, PostAuthsLoginResponse, PostAuthsSignupRequest } from '@recruit/interface'
import { EmailAuthGuard, JwtAuthGuard } from 'src/AuthGuards'
import { CurrentUser } from 'src/CustomDecorator'
import { Admin } from 'src/entities/Admin'
import { AdminAuthService } from 'src/services/AdminAuthService'
import { AdminService } from 'src/services/AdminService'
import { MenuService } from 'src/services/MenuService'
import { Transactional } from 'typeorm-transactional-cls-hooked'

@Controller('auths')
export class AuthController {
	@Inject() private readonly adminAuthService: AdminAuthService
	@Inject() private readonly adminService: AdminService
	@Inject() private readonly menuService: MenuService

	@Post('signup')
	@Transactional()
	async signUp(@Body() body: PostAuthsSignupRequest) {
	  await this.adminService.createAdmin(body.email, body.password)
	  return true
	}

	@UseGuards(EmailAuthGuard)
	@Post('login')
	async login(@CurrentUser() currentUser: Admin): Promise<PostAuthsLoginResponse> {
	  await this.adminAuthService.updateLoginDateAndToken(currentUser)
	  const jwt = this.adminAuthService.getJWT(currentUser)
	  return { token: jwt, admin: this.adminService.defineAdminModel(currentUser) }
	}

	@UseGuards(JwtAuthGuard)
	@Get('me')
	async me(@CurrentUser() currentUser: Admin): Promise<GetAuthsMeResponse> {
		return {
			item: this.adminService.defineAdminModel(currentUser)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Post('logout')
	async logout() {
		return true
	}

	@UseGuards(JwtAuthGuard)
	@Get('menu')
	async menu(@CurrentUser() currentUser: Admin) {
		return {
			menus: this.menuService.getMenus(currentUser.roles)
		}
	}

}