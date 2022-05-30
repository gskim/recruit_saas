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

export interface ResumeProjectData {
	title: string
	description: string
	started_at: number
	ended_at: number
}

@Entity('resume_projects')
export class ResumeProject extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column() resumeId: number

	@Column({ type: 'json' })
		data: ResumeProjectData[]

	@CreateDateColumn()
		createdAt: Date

	@UpdateDateColumn()
		updatedAt: Date

	@DeleteDateColumn()
		deletedAt: Date

	@ManyToOne(() => Resume)
		resume: Resume
}
