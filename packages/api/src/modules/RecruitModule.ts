import { Module, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RecruitController } from 'src/controllers/RecruitController'
import { RecruitRepository } from 'src/repositories/RecruitRepository'
import { RecruitService } from 'src/services/RecruitService'
import { AdminModule } from './AdminModule'
import { CompanyModule } from './CompanyModule'
import { JobCategoryModule } from './JobCategoryModule'
import { JobPostModule } from './JobPostModule'
import { ResumeModule } from './ResumeModule'
import { SkillModule } from './SkillModule'


@Module({
	imports: [
		TypeOrmModule.forFeature([RecruitRepository]),
		AdminModule, JobCategoryModule, SkillModule, JobPostModule, CompanyModule, ResumeModule
	],
	controllers: [RecruitController],
	providers: [RecruitService],
})
export class RecruitModule implements OnModuleInit {
	onModuleInit(): void {
		console.info('Init Recruit Module')
	}
}
