import { License } from 'src/entities/License'
import { EntityRepository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(License)
export class LicenseRepository extends BaseRepository<License> {
	async findByFilter(skip: number, limit: number, name?: string | null, type?: string | null, organization?: string | null) {
		const query = this.createQueryBuilder()
			.skip(skip).take(limit).orderBy({ id: 'DESC' })
		if (name) {
			query.andWhere('name LIKE :name', { name: `%${name}%` })
		}
		if (type) {
			query.andWhere('type = :type', { type })
		}
		if (organization) {
			query.andWhere('organization LIKE :organization', { name: `%${organization}%` })
		}
		return query.getManyAndCount()
	}
}