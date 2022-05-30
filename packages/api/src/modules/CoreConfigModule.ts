import { Global, Module, OnModuleInit } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Global()
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local',
	  }),
	],
	providers: [ConfigService],
	exports: [ConfigModule],
})
export class CoreConfigModule implements OnModuleInit {
	onModuleInit(): any {
		console.info('Init CoreConfig Module')
	}
}
