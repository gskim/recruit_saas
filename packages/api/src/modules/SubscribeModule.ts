import { Module, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SubscribeController } from 'src/controllers/SubscribeController'
import { SubscribeRepository } from 'src/repositories/SubscribeRepository'
import { SubscribePolicyService } from 'src/services/SubscribePolicyService'
import { SubscribeService } from 'src/services/SubscribeService'
import { CompanyModule } from './CompanyModule'


@Module({
	imports: [
		TypeOrmModule.forFeature([SubscribeRepository]),
		CompanyModule,
	],
	controllers: [SubscribeController],
	providers: [SubscribeService, SubscribePolicyService],
	exports: [],
})
export class SubscribeModule implements OnModuleInit {
	onModuleInit(): void {
		console.info('Init Subscribe Module')
	}
}
