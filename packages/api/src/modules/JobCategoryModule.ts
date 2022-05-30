import { Module, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JobCategoryController } from 'src/controllers/JobCategoryController'
import { JobCategoryRepository } from 'src/repositories/JobCategoryRepository'
import { JobCategoryService } from 'src/services/JobCategoryService'

@Module({
	imports: [TypeOrmModule.forFeature([JobCategoryRepository])],
	controllers: [JobCategoryController],
	providers: [JobCategoryService],
	exports: [JobCategoryService],
})
export class JobCategoryModule implements OnModuleInit {
	onModuleInit(): void {
		console.info('Init JobCategory Module')
	}
}
