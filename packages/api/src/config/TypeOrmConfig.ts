import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { SecretManager } from 'src/utils/SecretManager'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

@Injectable()
export default class TypeOrmConfig implements TypeOrmOptionsFactory {
	@Inject() configService: ConfigService
	async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
		const dbInfo = await this.getDbInfo()
		return {
			replication: dbInfo,
			logging: this.configService.get('DATABASE_LOGGING') === 'true',
			type: 'mysql',
			namingStrategy: new SnakeNamingStrategy(),
			charset: 'utf8mb4_unicode_ci',
			dateStrings: ['DATE'],
			entities: [__dirname + '/../entities/*{.ts,.js}'],
			synchronize: this.configService.get('DATABASE_SYNC') === 'true',
			timezone: process.env.TZ,
			extra: {
				connectionLimit: Number(this.configService.get('DATABASE_POOL_SIZE', 5)) * 2,
			}
		}
	}

	async getDbInfo() {
		if (process.env.NODE_ENV === 'production') {
			const sm = new SecretManager()
			const dbInfo = await sm.getDbInfo()
			return {
				master: {
					host: this.configService.get('DATABASE_MASTER_HOST'),
					port: 3306,
					username: dbInfo.username,
					password: dbInfo.password,
					database: 'recruit',
				},
				slaves: [{
					host: this.configService.get('DATABASE_SLAVE_HOST'),
					port: 3306,
					username: dbInfo.username,
					password: dbInfo.password,
					database: 'recruit',
				}],
			}
		} else {
			return {
				master: {
					host: this.configService.get('DATABASE_MASTER_HOST'),
					port: 3306,
					username: this.configService.get('DATABASE_USER'),
					password: this.configService.get('DATABASE_PASSWORD'),
					database: 'recruit',
				},
				slaves: [{
					host: this.configService.get('DATABASE_SLAVE_HOST'),
					port: 3306,
					username: this.configService.get('DATABASE_USER'),
					password: this.configService.get('DATABASE_PASSWORD'),
					database: 'recruit',
				}],
			}
		}
	}
}
