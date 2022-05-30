import { AdminRole, AdminStatus } from '@recruit/interface'
import * as passwordHash from 'password-hash'
import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity('admins')
export class Admin extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column({ type: 'varchar', length: 10, default: AdminStatus.WAIT })
		status: AdminStatus

	@Column({ type: 'varchar', length: 30, nullable: true })
		nickname: string | null

	@Column({ type: 'varchar', length: 200 })
		email: string

	@Column({ type: 'json' })
		roles: AdminRole[]

	@Column({ type: 'varchar', length: 12, nullable: true })
		phone: string | null

	@Column('varchar', {
		length: 100,
		nullable: true,
		comment: '로그인시 업데이트되는 토큰',
	})
		accessToken: string | null

	@Column({ type: 'varchar', length: 300 })
		password: string

	@Column({ type: 'varchar', nullable: true, length: 300 })
		profileImage: string | null

	@CreateDateColumn()
		createdAt: Date

	@UpdateDateColumn()
		updatedAt: Date

	comparePassword(password: string): boolean {
		if (this.password) {
			return passwordHash.verify(password, this.password)
		}
		return false
	}

	@BeforeInsert()
	savePassword(): void {
		if (this.password) {
			const hashedPassword = this.hashPassword(this.password)
			this.password = hashedPassword
		}
	}

	private hashPassword(password: string): string {
		return passwordHash.generate(password)
	}
}
