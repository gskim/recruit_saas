import { Module, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from 'src/controllers/UserController'
import { UserRepository } from 'src/repositories/UserRepository'
import { UserService } from 'src/services/UserService'
import { JobCategoryModule } from './JobCategoryModule'

@Module({
	imports: [TypeOrmModule.forFeature([UserRepository]),
		JobCategoryModule
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule implements OnModuleInit {
	onModuleInit(): void {
		console.info('Init User Module')
	}
}
