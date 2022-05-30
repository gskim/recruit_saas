import { ResumeLanguageTestType } from '@recruit/interface'
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

export interface ResumeLanguageTestData {
	applied_at: number
	type: ResumeLanguageTestType
	score: string
}

@Entity('resume_language_tests')
export class ResumeLanguageTest extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column() resumeId: number

	@Column({ type: 'json' })
		data: ResumeLanguageTestData[]

	@Column({ type: 'json' })
		types: ResumeLanguageTestType[]

	@CreateDateColumn()
		createdAt: Date

	@UpdateDateColumn()
		updatedAt: Date

	@DeleteDateColumn()
		deletedAt: Date

	@ManyToOne(() => Resume)
		resume: Resume
}
