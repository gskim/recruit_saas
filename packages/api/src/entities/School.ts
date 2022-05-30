import {
	BaseEntity,
	Column,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('schools')
export class School extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column({ type: 'varchar' })
		category1: string

	@Column({ type: 'varchar' })
		category2: string

	@Column({ type: 'varchar' })
		name: string

	@DeleteDateColumn()
		deletedAt: Date
}
