import { Module } from '@nestjs/common'
import { UserModule } from './UserModule'
import { TypeOrmConfigModule } from './TypeOrmConfigModule'
import { CoreConfigModule } from './CoreConfigModule'
import { IndexController } from 'src/controllers/IndexController'
import { AuthModule } from './AuthModule'
import { APP_FILTER } from '@nestjs/core'
import { AllExceptionsFilter } from 'src/filters/AllExceptionFilter'
import { CompanyModule } from './CompanyModule'
import { EmployeeModule } from './EmployeeModule'
import { JobCategoryModule } from './JobCategoryModule'
import { AdminModule } from './AdminModule'
import { SubscribeModule } from './SubscribeModule'
import { SkillModule } from './SkillModule'
import { JobPostModule } from './JobPostModule'
import { RecruitModule } from './RecruitModule'
import { ResumeModule } from './ResumeModule'
import { FileModule } from './FileModule'
import { DataModule } from './DataModule'
import { LicenseModule } from './LicenseModule'
import { SchoolModule } from './SchoolModule'

@Module({
	imports: [
		CoreConfigModule,
		TypeOrmConfigModule,
		AdminModule,
		AuthModule,
		CompanyModule,
		EmployeeModule,
		JobCategoryModule,
		UserModule,
		SubscribeModule,
		SkillModule,
		JobPostModule,
		RecruitModule,
		ResumeModule,
		FileModule,
		DataModule,
		LicenseModule,
		SchoolModule,
	],
	controllers: [IndexController],
	providers: [
		{
			provide: APP_FILTER,
			useClass: AllExceptionsFilter,
		  },
	]
})
export class AppModule {}
