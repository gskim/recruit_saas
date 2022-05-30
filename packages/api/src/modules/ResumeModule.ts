import { Module, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ResumeController } from 'src/controllers/ResumeController'
import { ResumeActivityRepository } from 'src/repositories/ResumeActivityRepository'
import { ResumeAwardRepository } from 'src/repositories/ResumeAwardRepository'
import { ResumeCareerRepository } from 'src/repositories/ResumeCareerRepository'
import { ResumeDescriptionRepository } from 'src/repositories/ResumeDescriptionRepository'
import { ResumeEducationRepository } from 'src/repositories/ResumeEducationRepository'
import { ResumeLanguageLevelRepository } from 'src/repositories/ResumeLanguageLevelRepository'
import { ResumeLanguageTestRepository } from 'src/repositories/ResumeLanguageTestRepository'
import { ResumeLicenseRepository } from 'src/repositories/ResumeLicenseRepository'
import { ResumeLinkRepository } from 'src/repositories/ResumeLinkRepository'
import { ResumeProjectRepository } from 'src/repositories/ResumeProjectRepository'
import { ResumeRepository } from 'src/repositories/ResumeRepository'
import { ResumeTaskRepository } from 'src/repositories/ResumeTaskRepository'
import { ResumeService } from 'src/services/ResumeService'
import { JobCategoryModule } from './JobCategoryModule'
import { SkillModule } from './SkillModule'


@Module({
	imports: [
		TypeOrmModule.forFeature([
			ResumeRepository,
			ResumeCareerRepository,
			ResumeActivityRepository,
			ResumeAwardRepository,
			ResumeDescriptionRepository,
			ResumeEducationRepository,
			ResumeLanguageLevelRepository,
			ResumeLanguageTestRepository,
			ResumeLicenseRepository,
			ResumeLinkRepository,
			ResumeProjectRepository,
			ResumeTaskRepository,
		]),
		JobCategoryModule,
		SkillModule,
	],
	controllers: [ResumeController],
	providers: [ResumeService],
	exports: [ResumeService],
})
export class ResumeModule implements OnModuleInit {
	onModuleInit(): void {
		console.info('Init Resume Module')
	}
}
