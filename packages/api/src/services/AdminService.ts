import { Injectable } from '@nestjs/common'
import { AdminModel, AdminStatus, AuthsSignupErrorCode } from '@recruit/interface'
import { CustomError } from 'src/CustomError'
import { Admin } from 'src/entities/Admin'
import { AdminRepository } from 'src/repositories/AdminRepository'


@Injectable()
export class AdminService {

	private readonly S3_URL = 'https://recruit.s3.ap-northeast-2.amazonaws.com/'
	constructor(private readonly adminRepository: AdminRepository) {}

	defineAdminModel(admin: Admin) {
		const profileImage = admin.profileImage ? this.S3_URL + admin.profileImage : null
		return new AdminModel(admin.id, admin.nickname, admin.email, profileImage, admin.phone, admin.status, admin.roles)
	}

	async deleteAdmin(adminId: number) {
		await this.adminRepository.updateStatus(adminId, AdminStatus.DELETE)
	}

	async changeStatus(adminId: number, status: AdminStatus) {
		await this.adminRepository.updateStatus(adminId, status)
	}

	async getTotalCount(status?: AdminStatus, nickname?: string, email?: string) {
		const query = this.adminRepository.createQueryBuilder()

		if (status) {
			query.andWhere('status = :status', { status })
		}
		if (nickname) {
			query.andWhere('nickname = :nickname', { nickname })
		}
		if (email) {
			query.andWhere('email = :email', { email })
		}
		return query.getCount()
	}

	async findAdminList(skip: number, limit: number, status?: AdminStatus, nickname?: string, email?: string) {
		return this.adminRepository.findByFilter(skip, limit, status, nickname, email)
	}

	async updateAdmin(admin: Admin) {
		await this.adminRepository.save(admin)
	}

	async createAdmin(email: string, password: string) {
		const existAdmin = await this.adminRepository.findOneByEmail(email)
		if (existAdmin) {
			throw new CustomError(AuthsSignupErrorCode.EXIST_EMAIL, '이미 가입되어있는 이메일입니다.')
		}
		const newAdmin = this.adminRepository.create()
		newAdmin.email = email
		newAdmin.password = password
		newAdmin.roles = []
		await this.adminRepository.save(newAdmin)
		return true
	}

	async findOneByAccessToken(id: number, accessToken: string) {
		return this.adminRepository.findOne(id, { where: { accessToken: accessToken } })
	}

	async findOneByEmail(email: string) {
		return this.adminRepository.findOneByEmail(email)
	}

	async getAdmin(id: number) {
		return this.adminRepository.getOne(id)
	}
}