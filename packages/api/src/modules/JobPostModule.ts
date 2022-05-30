import { Module, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JobPostController } from 'src/controllers/JobPostController'
import { JobPostFileRepository } from 'src/repositories/JobPostFileRepository'
import { JobPostRepository } from 'src/repositories/JobPostRepository'
import { JobPostService } from 'src/services/JobPostService'
import { CompanyModule } from './CompanyModule'
import { JobCategoryModule } from './JobCategoryModule'
import { SkillModule } from './SkillModule'

@Module({
	imports: [
		TypeOrmModule.forFeature([JobPostRepository, JobPostFileRepository]),
		JobCategoryModule,
		CompanyModule,
		SkillModule,
	],
	controllers: [JobPostController],
	providers: [JobPostService],
	exports: [JobPostService],
})
export class JobPostModule implements OnModuleInit {
	onModuleInit(): void {
		console.info('Init JobPost Module')
	}
}
