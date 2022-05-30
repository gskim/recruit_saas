import { Module, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminController } from 'src/controllers/AdminController'
import { AdminRepository } from 'src/repositories/AdminRepository'
import { AdminService } from 'src/services/AdminService'
import { FileModule } from './FileModule'


@Module({
	imports: [TypeOrmModule.forFeature([AdminRepository]), FileModule],
	controllers: [AdminController],
	providers: [AdminService],
	exports: [AdminService],
})
export class AdminModule implements OnModuleInit {
	onModuleInit(): void {
		console.info('Init Admin Module')
	}
}
