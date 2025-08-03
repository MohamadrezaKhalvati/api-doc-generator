import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Response<T> {
    statusCode: number
    data: T
    error: boolean
    errorData: any
    timestamp: string
}
@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<Response<any>> {
        return next.handle().pipe(
            map(data => ({
                statusCode: +context.switchToHttp().getResponse().statusCode,
                error: false,
                errorData: null,
                data,
                timestamp: new Date().toISOString(),
            })),
        )
    }
}
