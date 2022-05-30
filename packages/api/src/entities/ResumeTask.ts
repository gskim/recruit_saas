import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Resume } from './Resume'
import { ResumeCareer } from './ResumeCareer'

export interface ResumeTaskData {
	title: string
	description: string
}

@Entity('resume_tasks', { orderBy: { orderNum: 'ASC' } })
export class ResumeTask extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column() resumeId: number

	@Column() careerId: number

	@Column({ type: 'json' })
		data: ResumeTaskData

	@Column({ type: 'int' })
		orderNum: number

	@ManyToOne(() => ResumeCareer, (career) => career.tasks)
		career: ResumeCareer

	@CreateDateColumn()
		createdAt: Date

	@UpdateDateColumn()
		updatedAt: Date

	@DeleteDateColumn()
		deletedAt: Date

	@ManyToOne(() => Resume)
		resume: Resume
}
