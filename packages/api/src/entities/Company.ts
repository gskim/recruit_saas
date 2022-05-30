import { CompanySkillModel, CompanyStatus } from '@recruit/interface'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Employee } from './Employee'
import { JobPost } from './JobPost'
import { Subscribe } from './Subscribe'



@Entity('companies')
export class Company extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column({ type: 'varchar', length: 10, default: CompanyStatus.OPEN })
		status: CompanyStatus

	@Column({ type: 'varchar', length: 50 })
		name_ko: string

	@Column({ type: 'varchar', length: 50 })
		name_en: string

	@Column({ type: 'varchar', length: 200 })
		address: string

	@Column({ type: 'varchar', length: 100, nullable: true })
		email: string | null

	@Column({ type: 'varchar', length: 20, nullable: true })
		tel: string | null

	@Column({ type: 'varchar', nullable: true })
		logoImgUrl: string | null

	@Column({ type: 'json' })
		skill_list: CompanySkillModel[]

	@CreateDateColumn()
		createdAt: Date

	@UpdateDateColumn()
		updatedAt: Date

	@OneToMany(() => Employee, (employee) => employee.company)
		employees: Employee[]

	@OneToMany(() => Subscribe, (subscribe) => subscribe.company)
		subscribes: Subscribe[]

	@OneToMany(() => JobPost, (jobPost) => jobPost.company)
		jobPosts: JobPost[]
}
