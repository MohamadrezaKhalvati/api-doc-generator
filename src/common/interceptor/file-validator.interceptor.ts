import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class AttachUserInfoInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest()
        const userInfo = request.user
        request.userInfo = userInfo
        return next.handle()
    }
}
