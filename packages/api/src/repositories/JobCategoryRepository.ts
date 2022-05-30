import { JobCategory } from 'src/entities/JobCategory'
import { EntityRepository, In, Repository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(JobCategory)
export class JobCategoryRepository extends BaseRepository<JobCategory> {
	async findByIds(ids: number[]) {
		return this.find({
			where: {
				id: In(ids),
			}
		})
	}
}