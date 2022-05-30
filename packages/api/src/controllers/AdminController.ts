import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common'
import { AdminService } from 'src/services/AdminService'
import { AdminStatus, GetAdminsDetailErrorCode, GetAdminsDetailResponse, GetAdminsRequest, GetAdminsResponse,
	PostAdminsDetailProfileImageRequest,
	PostAdminsDetailProfileImageResponse,
	PutAdminsDetailErrorCode, PutAdminsDetailRequest } from '@recruit/interface'
import { CustomError } from 'src/CustomError'
import { FileService } from 'src/services/FileService'

@Controller('admins')
export class AdminController {

	@Inject() private readonly adminService: AdminService
	@Inject() private readonly fileService: FileService

	@Get()
	async getAdmins(@Query() query: GetAdminsRequest): Promise<GetAdminsResponse> {
		const [list, totalCount] = await Promise.all([
			this.adminService.findAdminList(query.skip, query.limit, query.status, query.nickname, query.email),
			this.adminService.getTotalCount(query.status, query.nickname, query.email)
		])
		return {
			item_list: list.map((admin) => this.adminService.defineAdminModel(admin)),
			total_count: totalCount
		}
	}

	@Get(':id(\\d+)')
	async getAdmin(@Param('id') id: number): Promise<GetAdminsDetailResponse> {
		const admin = await this.adminService.getAdmin(id)
		if (!admin) {
			throw new CustomError(GetAdminsDetailErrorCode.NOT_FOUND)
		}
		return {
			item: this.adminService.defineAdminModel(admin)
		}
	}

	@Put(':id(\\d+)')
	async updateAdmin(@Param('id') id: number, @Body() body: PutAdminsDetailRequest) {
		const admin = await this.adminService.getAdmin(id)
		if (!admin) {
			throw new CustomError(PutAdminsDetailErrorCode.NOT_FOUND)
		}
		admin.nickname = body.nickname
		admin.phone = body.phone
		admin.profileImage = body.profile_image
		admin.status = body.status
		admin.roles = body.roles
		await this.adminService.updateAdmin(admin)
		return true
	}

	@Put(':id(\\d+)/status')
	async updateAdminStatus(@Param('id') id: number, @Body('status') status: AdminStatus) {
		await this.adminService.changeStatus(id, status)
		return true
	}

	@Delete(':id(\\d+)')
	async deleteAdmin(@Param('id') id: number) {
		await this.adminService.deleteAdmin(id)
		return true
	}

	@Post(':id(\\d+)/profile_image')
	async profileImagePresignedUrl(@Body() body: PostAdminsDetailProfileImageRequest): Promise<PostAdminsDetailProfileImageResponse> {
		return await this.fileService.adminProfileImagePresignedUrl(body.type)
	}
}