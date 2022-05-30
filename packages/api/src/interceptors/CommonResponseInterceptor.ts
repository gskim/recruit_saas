import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { CommonResponse } from '@recruit/interface'

@Injectable()
export class CommonResponseInterceptor<T, E> implements NestInterceptor<T, CommonResponse<T, E>> {
	intercept(context: ExecutionContext, next: CallHandler): Observable<CommonResponse<T, E>> {
		const args = context.getArgs()
		if (args[0].url.includes('/files/download')) {
			return next.handle().pipe()
		} else {
			return next.handle().pipe(map(data => ({ data: data, error: null })))
		}
	}
}
