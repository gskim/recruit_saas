import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Company } from './Company'



@Entity('subscribes')
export class Subscribe extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column({ type: 'datetime', precision: 6 })
		startedAt: Date

	@Column({ type: 'datetime', precision: 6 })
		endedAt: Date

	@Column({ type: 'int' })
		price: number

	@Column({ type: 'text', nullable: true })
		memo: string | null

	@Column() companyId: number

	@Column() subscribePolicyId: number

	@Column() createdAdminId: number

	@Column() updatedAdminId: number

	@ManyToOne(() => Company, (company) => company.subscribes)
		company: Company

	@CreateDateColumn()
		createdAt: Date

	@UpdateDateColumn()
		updatedAt: Date
}
