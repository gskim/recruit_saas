import { UserStatus } from '@recruit/interface'
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

@Entity('users')
export class User extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column({ type: 'varchar', length: 10, default: UserStatus.OPEN })
		status: UserStatus

	@Column({ type: 'varchar', length: 200 })
		email: string

	@Column('varchar', {
		length: 100,
		nullable: true,
		comment: '로그인시 업데이트되는 토큰',
	})
		accessToken: string | null

	@Column({ type: 'varchar', length: 300 })
		password: string

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
