import {
	BaseEntity,
	Column,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('licenses')
export class License extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column({ type: 'varchar' })
		type: string

	@Column({ type: 'varchar' })
		name: string

	@Column({ type: 'varchar' })
		organization: string

	@DeleteDateColumn()
		deletedAt: Date
}
