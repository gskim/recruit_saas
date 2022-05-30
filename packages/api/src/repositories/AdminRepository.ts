import { AdminStatus } from '@recruit/interface'
import { Admin } from 'src/entities/Admin'
import { EntityRepository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(Admin)
export class AdminRepository extends BaseRepository<Admin> {

	async updateStatus(id: number, status: AdminStatus) {
		await this.createQueryBuilder()
			.update()
			.where({ id })
			.set({ status })
			.execute()
	}

	async findOneByEmail(email: string) {
		return this.findOne({
			where: { email },
		})
	}

	async getOne(id: number) {
		return this.findOne(id)
	}

	async findByFilter(skip: number, limit: number, status?: AdminStatus, nickname?: string, email?: string) {
		const query = this.createQueryBuilder().skip(skip).take(limit).orderBy({ 'id': 'DESC' })
		if (status) {
			query.andWhere('status = :status', { status })
		}
		if (nickname) {
			query.andWhere('nickname = :nickname', { nickname })
		}
		if (email) {
			query.andWhere('email = :email', { email })
		}
		return query.getMany()

	}
}