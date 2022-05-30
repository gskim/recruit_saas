import { ResumeEducationStatus, ResumeEducationType } from '@recruit/interface'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Resume } from './Resume'

export interface ResumeEducationData {
	status: ResumeEducationStatus
	type: ResumeEducationType
	target_id: number | null
	name: string
	major: string | null
	score: string | null
	started_at: number
	ended_at: number | null
}

@Entity('resume_educations')
export class ResumeEducation extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column() resumeId: number

	@Column({ type: 'varchar', length: 20 })
		lastType: ResumeEducationType

	@Column({ type: 'json' })
		data: ResumeEducationData[]

	@Column({ type: 'json' })
		targetIds: number[]

	@CreateDateColumn()
		createdAt: Date

	@UpdateDateColumn()
		updatedAt: Date

	@DeleteDateColumn()
		deletedAt: Date

	@OneToOne(() => Resume, (resume) => resume.resumeEducation)
	@JoinColumn()
		resume: Resume
}
