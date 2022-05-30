import { ResumeStatus } from '@recruit/interface'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { JobCategory } from './JobCategory'
import { ResumeEducation } from './ResumeEducation'
import { ResumeLanguageLevel } from './ResumeLanguageLevel'
import { ResumeLicense } from './ResumeLicense'
import { User } from './User'


@Entity('resumes')
export class Resume extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column({ nullable: true })
		userId: number | null

	@Column({ type: 'varchar', length: 50 })
		title: string

	@Column({ type: 'varchar', length: 20 })
		name: string

	@Column({ type: 'varchar', length: 200 })
		email: string

	@Column({ type: 'varchar', length: 10, comment: 'YYYYMMDD', nullable: true })
		birthday: string | null

	@Column({ type: 'varchar', length: 1, comment: 'm , w' })
		gender: string

	@Column({ type: 'varchar', length: 300, nullable: true })
		address: string | null

	@Column({ type: 'varchar', length: 12, nullable: true })
		phone: string | null

	@Column({ type: 'varchar', nullable: true, length: 300 })
		profileImage: string | null

	@Column()
		depth1JobCategoryId: number

	@Column()
		depth2JobCategoryId: number

	@Column({ type: 'json' })
		depth3JobCategoryIds: number[]

	@Column({ type: 'json' })
		skillIds: number[]

	@Column({ type: 'int', comment: '연봉', nullable: true })
		annualIncome: number | null

	@Column({ type: 'varchar', length: 30, default: ResumeStatus.공개 })
		status: ResumeStatus

	@ManyToOne(() => User, { nullable: true })
		user: User | null

	@CreateDateColumn()
		createdAt: Date

	@UpdateDateColumn()
		updatedAt: Date

	@ManyToOne(() => JobCategory, { createForeignKeyConstraints: false })
		depth1JobCategory: JobCategory

	@ManyToOne(() => JobCategory, { createForeignKeyConstraints: false })
		depth2JobCategory: JobCategory

	@OneToOne(() => ResumeEducation, (resumeEducation) => resumeEducation.resume)
		resumeEducation: ResumeEducation

	@OneToOne(() => ResumeLicense, (resumeEducation) => resumeEducation.resume)
		resumeLicense: ResumeLicense

	@OneToOne(() => ResumeLanguageLevel, (resumeEducation) => resumeEducation.resume)
		resumeLanguageLevel: ResumeLanguageLevel

}
