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
import { SkillCategory } from './SkillCategory'



@Entity('skills')
export class Skill extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column({ type: 'varchar', length: 30 })
		name: string

	@Column({ type: 'json' })
		alias: string[]

	@Column({ type: 'varchar', length: 30, nullable: true })
		imageKey: string | null

	@Column({ type: 'varchar', length: 200, nullable: true })
		description: string | null

	@Column({ type: 'varchar', length: 200, nullable: true })
		websiteUrl: string | null

	@Column()
		skillCategoryId: number

	@ManyToOne(() => SkillCategory, (skillCategory) => skillCategory.skills)
		skillCategory: SkillCategory

	@CreateDateColumn()
		createdAt: Date

	@UpdateDateColumn()
		updatedAt: Date

	@DeleteDateColumn()
		deletedAt: Date
}
