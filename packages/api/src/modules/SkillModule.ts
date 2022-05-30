import { Module, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SkillCategoryController } from 'src/controllers/SkillCategoryController'
import { SkillController } from 'src/controllers/SkillController'
import { SkillCategoryRepository } from 'src/repositories/SkillCategoryRepository'
import { SkillRepository } from 'src/repositories/SkillRepository'
import { SkillCategoryService } from 'src/services/SkillCategoryService'
import { SkillService } from 'src/services/SkillService'
import { FileModule } from './FileModule'


@Module({
	imports: [
		TypeOrmModule.forFeature([SkillRepository, SkillCategoryRepository
		]), FileModule],
	controllers: [SkillController, SkillCategoryController],
	providers: [SkillService, SkillCategoryService],
	exports: [SkillService, SkillCategoryService],
})
export class SkillModule implements OnModuleInit {
	onModuleInit(): void {
		console.info('Init Skill Module')
	}
}
