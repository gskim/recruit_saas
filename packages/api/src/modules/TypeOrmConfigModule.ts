import { TypeOrmModule } from '@nestjs/typeorm'
import TypeOrmConfig from 'src/config/TypeOrmConfig'
import {
	Module,
} from '@nestjs/common'

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useClass: TypeOrmConfig,
		}),
	],
})
export class TypeOrmConfigModule {}
