import { EmployeeStatus } from '@recruit/interface'
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



@Entity('employees')
export class Employee extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column({ type: 'varchar', length: 10, default: EmployeeStatus.OPEN })
		status: EmployeeStatus

	@Column({ type: 'varchar', length: 30 })
		name: string

	@Column({ type: 'varchar', length: 200 })
		email: string

	@Column({ type: 'varchar', length: 12 })
		phone: string

	@Column({ type: 'json' })
		roles: string[]

	@Column()
		companyId: number

	@CreateDateColumn()
		createdAt: Date

	@UpdateDateColumn()
		updatedAt: Date

	@ManyToOne(() => Company, (company) => company.employees, { nullable: false })
		company: Company
}
