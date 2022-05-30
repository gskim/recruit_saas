import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { CareerType, JobPostProcess, JobPostStatus, JobPostTerminatedReason,
	ResumeEducationType } from '@recruit/interface'
import { JobCategory } from './JobCategory'
import { Company } from './Company'
import { JobPostFile } from './JobPostFile'




@Entity('job_posts')
export class JobPost extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column({ type: 'varchar', length: 50 })
		title: string

	@Column({ type: 'varchar', length: 10 })
		status: JobPostStatus

	@Column({ type: 'varchar', length: 10 })
		terminatedReason: JobPostTerminatedReason

	@Column({ type: 'varchar', length: 20 })
		careerType: CareerType

	@Column({ type: 'int' })
		careerPeriod: number

	@Column({ type: 'text' })
		description: string

	@Column({ type: 'varchar', length: 200 })
		linkUrl: string

	@Column()
		depth1JobCategoryId: number

	@Column()
		depth2JobCategoryId: number

	@Column({ type: 'json' })
		depth3JobCategoryIds: number[]

	@Column()
		companyId: number

	@Column({ type: 'json' })
		skillIds: number[]

	@Column({ type: 'datetime', precision: 6 })
		startedAt: Date

	@Column({ type: 'datetime', nullable: true, precision: 6 })
		endedAt: Date | null

	@Column({ type: 'varchar', length: 300, nullable: true })
		memo: string | null

	@Column({ type: 'varchar', length: 10, nullable: true })
		minEducationType: ResumeEducationType | null

	@Column({ type: 'int', width:2, nullable: true })
		minAge: number | null

	@Column({ type: 'int', width: 2, nullable: true })
		maxAge: number | null

	@Column({ type: 'int', nullable: true })
		minAnnualIncome: number | null

	@Column({ type: 'int', nullable: true })
		maxAnnualIncome: number | null

	@Column({ type: 'varchar', length: 200, nullable: true })
		workPlace: string | null

	@Column({ type: 'json' })
		process: JobPostProcess[]

	@Column({ type: 'varchar', length: 20, nullable: true })
		charge: string | null

	@ManyToOne(() => JobCategory, { createForeignKeyConstraints: false })
		depth1JobCategory: JobCategory

	@ManyToOne(() => JobCategory, { createForeignKeyConstraints: false })
		depth2JobCategory: JobCategory

	@ManyToOne(() => Company, (company) => company.jobPosts)
		company: Company

	@OneToMany(() => JobPostFile, jobPostFile => jobPostFile.jobPost)
		jobPostFiles: JobPostFile[]

	@CreateDateColumn()
		createdAt: Date

	@UpdateDateColumn()
		updatedAt: Date
}
