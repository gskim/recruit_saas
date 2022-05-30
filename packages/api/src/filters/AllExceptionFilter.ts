import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	HttpStatus,
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { CustomError } from 'src/CustomError'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

	catch(exception: unknown, host: ArgumentsHost): void {
		const { httpAdapter } = this.httpAdapterHost
		const ctx = host.switchToHttp()
		console.log('-----------------------')
		console.error(exception)
		if (exception instanceof CustomError) {
			const responseBody = {
				data: null,
				error: {
					code: exception.name,
					message: exception.message

				}
			}
			httpAdapter.reply(ctx.getResponse(), responseBody, 200)
		} else {
			if (exception instanceof HttpException) {
				const responseBody = {
					data: null,
					error: {
						code: exception.name,
						message: exception.message,
					},
				}
				httpAdapter.reply(ctx.getResponse(), responseBody, exception.getStatus())
			} else {
				const responseBody = {
					data: null,
					error: {
						code: HttpStatus.INTERNAL_SERVER_ERROR,
						message: exception,
					},
				}
				httpAdapter.reply(ctx.getResponse(), responseBody, HttpStatus.INTERNAL_SERVER_ERROR)
			}
		}

	}
}
