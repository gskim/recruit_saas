import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Index,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Resume } from './Resume'
import { ResumeTask } from './ResumeTask'

export interface ResumeCareerData {
	started_at: number
	ended_at: number | null
	company_description: string
	organization: string
	charge: string
	career_period_months: number | null
}

@Entity('resume_careers', { orderBy: { orderNum: 'ASC' } })
export class ResumeCareer extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Index()
	@Column() resumeId: number

	@Column({ type: 'varchar', length: 30 })
		companyName: string

	@Column({ type: 'int', nullable: true })
		companyId: number | null

	@Column({ type: 'json' })
		data: ResumeCareerData

	@Column({ type: 'int' })
		orderNum: number

	@CreateDateColumn()
		createdAt: Date

	@UpdateDateColumn()
		updatedAt: Date

	@DeleteDateColumn()
		deletedAt: Date

	@ManyToOne(() => Resume)
		resume: Resume

	@OneToMany(() => ResumeTask, (task) => task.career)
		tasks: ResumeTask[]
}
