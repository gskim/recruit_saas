import { Module, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EmployeeController } from 'src/controllers/EmployeeController'
import { EmployeeRepository } from 'src/repositories/EmployeeRepository'
import { EmployeeService } from 'src/services/EmployeeService'
import { CompanyModule } from './CompanyModule'

@Module({
	imports: [TypeOrmModule.forFeature([EmployeeRepository]), CompanyModule],
	controllers: [EmployeeController],
	providers: [EmployeeService],
})
export class EmployeeModule implements OnModuleInit {
	onModuleInit(): void {
		console.info('Init Employee Module')
	}
}
