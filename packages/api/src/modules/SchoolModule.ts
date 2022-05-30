import { Module, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SchoolController } from 'src/controllers/SchoolController'
import { SchoolRepository } from 'src/repositories/SchoolRepository'
import { SchoolService } from 'src/services/SchoolService'


@Module({
	imports: [TypeOrmModule.forFeature([
		SchoolRepository,
	])],
	controllers: [SchoolController],
	providers: [SchoolService],
	exports: [SchoolService],
})
export class SchoolModule implements OnModuleInit {
	onModuleInit(): void {
		console.info('Init School Module')
	}
}
