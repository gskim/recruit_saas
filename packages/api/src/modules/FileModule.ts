import { Module, OnModuleInit } from '@nestjs/common'
import { FileController } from 'src/controllers/FileController'
import { FileService } from 'src/services/FileService'


@Module({
	controllers: [FileController],
	providers: [FileService],
	exports: [FileService],
})
export class FileModule implements OnModuleInit {
	onModuleInit(): void {
		console.info('Init File Module')
	}
}
