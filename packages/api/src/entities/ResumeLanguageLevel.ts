import { ResumeLanguageLevelType } from '@recruit/interface'
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


export interface ResumeLanguageLevelData {
	type: ResumeLanguageLevelType
	grade: string
}

@Entity('resume_language_levels')
export class ResumeLanguageLevel extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column() resumeId: number

	@Column({ type: 'json' })
		data: ResumeLanguageLevelData[]

	@CreateDateColumn()
		createdAt: Date

	@UpdateDateColumn()
		updatedAt: Date

	@DeleteDateColumn()
		deletedAt: Date

	@OneToOne(() => Resume, (resume) => resume.resumeLanguageLevel)
	@JoinColumn()
		resume: Resume
}
