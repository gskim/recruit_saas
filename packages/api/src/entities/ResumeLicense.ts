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

export interface ResumeLicenseData {
	applied_at: number
	license_id: number | null
	name: string
	organization: string
}

@Entity('resume_licenses')
export class ResumeLicense extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column() resumeId: number

	@Column({ type: 'json' })
		data: ResumeLicenseData[]

	@Column({ type: 'json' })
		licenseIds: number[]

	@CreateDateColumn()
		createdAt: Date

	@UpdateDateColumn()
		updatedAt: Date

	@DeleteDateColumn()
		deletedAt: Date

	@OneToOne(() => Resume, (resume) => resume.resumeLicense)
	@JoinColumn()
		resume: Resume
}
