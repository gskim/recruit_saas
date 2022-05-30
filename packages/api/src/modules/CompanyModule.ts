import { Module, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CompanyController } from 'src/controllers/CompanyController'
import { CompanyRepository } from 'src/repositories/CompanyRepository'
import { CompanyService } from 'src/services/CompanyService'
import { FileModule } from './FileModule'


@Module({
	imports: [
		TypeOrmModule.forFeature([CompanyRepository]),
		FileModule,
	],
	controllers: [CompanyController],
	providers: [CompanyService],
	exports: [CompanyService],
})
export class CompanyModule implements OnModuleInit {
	onModuleInit(): void {
		console.info('Init Company Module')
	}
}
