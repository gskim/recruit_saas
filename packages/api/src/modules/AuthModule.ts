import { Module, OnModuleInit } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from 'src/Constants'
import { AuthController } from 'src/controllers/AuthController'
import { AdminAuthService } from 'src/services/AdminAuthService'
import { EmailStrategy } from 'src/services/EmailStrategy'
import { JwtStrategy } from 'src/services/JWTStrategy'
import { MenuService } from 'src/services/MenuService'
import { AdminModule } from './AdminModule'

@Module({
	imports: [AdminModule, JwtModule.register({
		secret: jwtConstants.secret
		// signOptions: { expiresIn: '60s' }
	})],
	controllers: [AuthController],
	providers: [AdminAuthService, EmailStrategy, JwtStrategy, MenuService],
})
export class AuthModule implements OnModuleInit {
	onModuleInit(): void {
		console.info('Init Auth Module')
	}
}
