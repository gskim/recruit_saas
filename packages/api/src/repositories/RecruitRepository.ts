import { Recruit } from 'src/entities/Recruit'
import { EntityRepository, Repository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(Recruit)
export class RecruitRepository extends BaseRepository<Recruit> {

	async findOneWithRelationsById(id: number) {
		return this.findOne(id, {
			relations: [
				'company', 'updatedAdmin', 'user', 'jobPost'
			]
		})
	}
}