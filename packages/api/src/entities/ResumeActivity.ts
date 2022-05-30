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

export interface ResumeActivityData {
	title: string
	description: string
	started_at: number
	ended_at: number
}

@Entity('resume_activities')
export class ResumeActivity extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column() resumeId: number

	@Column({ type: 'json' })
		data: ResumeActivityData[]

	@CreateDateColumn()
		createdAt: Date

	@UpdateDateColumn()
		updatedAt: Date

	@DeleteDateColumn()
		deletedAt: Date

	@ManyToOne(() => Resume)
		resume: Resume
}
