import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class RemovePasswordInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => {
                return this.removePasswordField(data)
            }),
        )
    }

    private removePasswordField(data: any): any {
        if (Array.isArray(data)) {
            return data.map(item => this.removePasswordField(item))
        } else if (data !== null && typeof data === 'object') {
            const { ...rest } = data
            for (const key in rest) {
                if (
                    typeof rest[key] === 'object' &&
                    !(rest[key] instanceof Date)
                ) {
                    rest[key] = this.removePasswordField(rest[key])
                }
            }
            return rest
        }
        return data
    }
}
