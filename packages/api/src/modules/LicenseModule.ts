import { Module, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LicenseController } from 'src/controllers/LicenseController'
import { LicenseRepository } from 'src/repositories/LicenseRepository'
import { LicenseService } from 'src/services/LicenseService'


@Module({
	imports: [TypeOrmModule.forFeature([
		LicenseRepository,
	])],
	controllers: [LicenseController],
	providers: [LicenseService],
	exports: [LicenseService],
})
export class LicenseModule implements OnModuleInit {
	onModuleInit(): void {
		console.info('Init License Module')
	}
}
