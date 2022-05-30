import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity('job_categories')
export class JobCategory extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column({ type: 'varchar', length: 30 })
		name: string

	@Column({ type: 'tinyint' })
		depth: number

	@Column({ nullable: true })
		parentId: number

	@CreateDateColumn()
		createdAt: Date

	@UpdateDateColumn()
		updatedAt: Date

	@DeleteDateColumn({ nullable: true })
		deletedAt: Date | null

	@ManyToOne(() => JobCategory, category => category.children)
		parent: JobCategory

	@OneToMany(() => JobCategory, category => category.parent)
		children: JobCategory[]
}
