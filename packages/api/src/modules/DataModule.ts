import { Module, OnModuleInit } from '@nestjs/common'
import { DataController } from 'src/controllers/DataController'
import { JobCategoryModule } from './JobCategoryModule'
import { LicenseModule } from './LicenseModule'
import { SchoolModule } from './SchoolModule'
import { SkillModule } from './SkillModule'


@Module({
	imports: [SkillModule, JobCategoryModule, LicenseModule, SchoolModule],
	controllers: [DataController],
})
export class DataModule implements OnModuleInit {
	onModuleInit(): void {
		console.info('Init Data Module')
	}
}
