// src/common/utils/create-response.util.ts

export function createResponse<T>(
    data: T,
    statusCode = 200,
    error = false,
    errorData: any = null,
): Response<T> {
    return {
        statusCode,
        data,
        error,
        errorData,
        timestamp: new Date().toISOString(),
    }
}

export function createErrorResponse<T>(
    errorMessage: any,
    statusCode = 400,
    errorData: any = null,
): Response<T> {
    return {
        statusCode,
        data: null as unknown as T,
        error: true,
        errorData: errorData || errorMessage,
        timestamp: new Date().toISOString(),
    }
}

export interface Response<T> {
    statusCode: number
    data: T
    error: boolean
    errorData: any
    timestamp: string
}
