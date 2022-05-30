process.env.UV_THREADPOOL_SIZE = '64'
import 'module-alias/register'
import { ValidationPipe } from '@nestjs/common'
import { join } from 'path'
import { NestFactory } from '@nestjs/core'
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express'
import { initializeTransactionalContext, patchTypeORMRepositoryWithBaseRepository } from 'typeorm-transactional-cls-hooked'
import { AppModule } from './modules/AppModule'
import * as express from 'express'
import { CommonResponseInterceptor } from './interceptors/CommonResponseInterceptor'


export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '30mb' }))
app.disable('x-powered-by')

async function bootstrap() {
	initializeTransactionalContext()
	patchTypeORMRepositoryWithBaseRepository()
	const nestApp = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(app))
	nestApp.enableCors()
	nestApp.useGlobalPipes(new ValidationPipe({
		transform: true,
		disableErrorMessages: false,

	}))
	nestApp.useGlobalInterceptors(new CommonResponseInterceptor())
	nestApp.useStaticAssets(join(__dirname, '..', 'public'))
	await nestApp.init()
	await nestApp.listen(80)
}
bootstrap()
