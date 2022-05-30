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

export interface ResumeDescriptionData {
	title: string
	content: string
}

@Entity('resume_descriptions')
export class ResumeDescription extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column() resumeId: number

	@Column({ type: 'json' })
		data: ResumeDescriptionData

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
}
