import { RecruitProcess, RecruitStatus } from '@recruit/interface'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Admin } from './Admin'
import { Company } from './Company'
import { JobPost } from './JobPost'
import { Resume } from './Resume'


@Entity('recruits')
export class Recruit extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column() jobPostId: number

	@Column() resumeId: number

	@Column() companyId: number

	@Column() createdAdminId: number

	@Column() updatedAdminId: number

	@Column({ type: 'varchar', length: 50 })
		title: string

	@Column({ type: 'varchar', length: 10 })
		status: RecruitStatus

	@Column({ type: 'varchar', length: 10 })
		process: RecruitProcess

	@Column({ type: 'varchar', length: 500 })
		description: string

	@ManyToOne(() => Company)
		company: Company

	@ManyToOne(() => JobPost)
		jobPost: JobPost

	@ManyToOne(() => Admin)
		updatedAdmin: Admin

	@ManyToOne(() => Resume)
		resume: Resume

	@CreateDateColumn()
		createdAt: Date

	@UpdateDateColumn()
		updatedAt: Date
}
