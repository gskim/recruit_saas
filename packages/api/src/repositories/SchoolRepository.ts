import { School } from 'src/entities/School'
import { EntityRepository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(School)
export class SchoolRepository extends BaseRepository<School> {

	async findByFilter(skip: number, limit: number, name?: string | null, category1?: string | null, category2?: string | null) {
		const query = this.createQueryBuilder()
			.skip(skip)
			.take(limit)
			.orderBy({ id: 'DESC' })
		if (name) {
			query.andWhere('name LIKE :name', { name: `%${name}%` })
		}
		if (category1) {
			query.andWhere('category1 = :category1', { category1 })
		}
		if (category2) {
			query.andWhere('category1 = :category1', { category2 })
		}
		return query.getManyAndCount()
	}
}