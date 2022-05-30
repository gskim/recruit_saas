import { User } from 'src/entities/User'
import { EntityRepository, Repository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {
	async getUserAndJobCategories(userId: number) {
		return await this.createQueryBuilder('user')
			.leftJoinAndSelect('user.jobCategoryToUserMappings', 'jobCategoryToUserMappings')
			.andWhere('user.id = :userId', { userId })
			.getOne()
	}
}