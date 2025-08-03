import {
    ArgumentsHost,
    Catch,
    ForbiddenException,
    HttpStatus,
    Logger,
    UnauthorizedException,
} from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { EntityPropertyNotFoundError, QueryFailedError } from 'typeorm'

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        try {
            const ctx = host.switchToHttp()
            const response = ctx.getResponse()
            const errorResponse = {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                error: true,
                errorData: exception?.message,
                data: null,
            }

            if (exception instanceof QueryFailedError) {
                errorResponse.statusCode = HttpStatus.BAD_REQUEST
            } else if (exception instanceof EntityPropertyNotFoundError) {
                errorResponse.statusCode = HttpStatus.NOT_FOUND
            } else if (exception instanceof UnauthorizedException) {
                errorResponse.errorData = exception.message
                errorResponse.statusCode = HttpStatus.UNAUTHORIZED
            } else if (exception instanceof ForbiddenException) {
                errorResponse.errorData = exception.message
                errorResponse.statusCode = HttpStatus.FORBIDDEN
            } else {
                if (exception.code === 'ENOENT') {
                    errorResponse.errorData = exception.message
                    errorResponse.statusCode = 404
                } else {
                    errorResponse.errorData =
                        exception.getResponse()?.message ??
                        exception.getResponse()
                    errorResponse.statusCode =
                        exception.getResponse()?.statusCode ?? 400
                }
            }

            response.status(errorResponse.statusCode).json(errorResponse)
            return response.send()
        } catch (e) {
            Logger.warn('>>>>>>>>>>>CATCH')
            console.log('error', e)

            try {
                const ctx = host.switchToHttp()
                const response = ctx.getResponse()

                response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR
                response.send({
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: true,
                    errorData: 'Internal Server Error',
                    data: null,
                })
            } catch (e) {
                super.catch(exception, host)
            }
        }
    }
}
