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
import { JobPost } from './JobPost'

@Entity('job_post_files')
export class JobPostFile extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column({ type: 'varchar', length: 50 })
		name: string

	@Column({ type: 'varchar', length: 50 })
		key: string

	@Column({ type: 'int', nullable: true })
		jobPostId: number | null

	@ManyToOne(() => JobPost, { createForeignKeyConstraints: false, nullable: true })
		jobPost: JobPost

	@CreateDateColumn()
		createdAt: Date

	@UpdateDateColumn()
		updatedAt: Date
}
