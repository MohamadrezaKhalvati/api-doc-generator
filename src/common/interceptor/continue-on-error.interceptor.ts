import {
    BadRequestException,
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import { Observable, of } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable()
export class ContinueOnErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError(error => {
                if (error instanceof BadRequestException) {
                    console.warn(
                        'Bad request error intercepted:',
                        error.message,
                    )

                    return of({
                        warning: 'Bad request handled, flow continues',
                    })
                }
                // For other errors, rethrow
                throw error
            }),
        )
    }
}
