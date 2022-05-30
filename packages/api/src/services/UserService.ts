import { Inject, Injectable } from '@nestjs/common'
import { UserModel, UserStatus } from '@recruit/interface'
import { User } from 'src/entities/User'
import { UserRepository } from 'src/repositories/UserRepository'
import { JobCategoryService } from './JobCategoryService'

@Injectable()
export class UserService {
	constructor(
		private readonly userRepository: UserRepository,
	) {}

	@Inject() private readonly jobCategoryService: JobCategoryService
	private readonly USER_INIT_PASSWORD = '12345678'

	definedUserModel(user: User) {
		return new UserModel(user.id, user.email, user.status)
	}

	async getTotalCount() {
		return this.userRepository.count()
	}

	async createUser(email: string) {
		const user = this.userRepository.create()
		user.email = email
		user.status = UserStatus.OPEN
		user.password = this.USER_INIT_PASSWORD
		return await this.userRepository.save(user)
	}

	async updateUser(id: number, email: string) {
		await this.userRepository.createQueryBuilder()
			.update()
			.set({
				email,
			})
			.where({ id })
			.execute()
		return true
	}

	async deleteUser(id: number) {
		await this.userRepository.createQueryBuilder()
			.update()
			.set({
				status: UserStatus.DELETE
			})
			.where({ id })
			.execute()
		return true
	}

	async getUser(id: number) {
		return this.userRepository.findOne(id)
	}

	async getUsers(skip: number, limit: number) {
		return this.userRepository.find({
			skip,
			take: limit,
		})
	}
}