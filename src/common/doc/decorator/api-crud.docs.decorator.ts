import { applyDecorators, Type } from '@nestjs/common'
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiExtraModels,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
    ApiUnauthorizedResponse,
    getSchemaPath,
} from '@nestjs/swagger'
import { getMetadataArgsStorage } from 'typeorm'
import { BaseResponseDto } from '../dto/base-response.dto'
import { ErrorResponseDto } from '../dto/error-response.dto'
import { PaginatedResponseDto } from '../dto/pagination-response.dto'

// Supported HTTP methods as protocols
type ApiProtocol = 'POST' | 'GET' | 'GETALL' | 'PATCH' | 'DELETE' | 'PING'

// Custom exception mapping
interface ExceptionConfig {
    description: string
    type: Type<unknown>
}

// Query options toggles
interface QueryOptions {
    relation?: boolean
    select?: boolean
    filter?: boolean
    pagination?: boolean
}

// Main decorator options
interface ApiCrudDocsOptions {
    protocol: ApiProtocol
    summary?: string
    /** Use this entity for generating relation/select enums */
    entity?: Type<unknown>
    /** DTO for response wrapping */
    dtoType?: Type<unknown>
    /** Alternative DTO for response wrapping */
    dataType?: Type<unknown>
    statusCode?: number
    successDescription?: string
    errorType?: Type<unknown>
    tags?: string[]
    /** Toggle which query params to include */
    queryOptions?: QueryOptions
    exceptions?: ExceptionConfig[]
}

// Helpers to wrap responses
function wrapBaseResponse(type: Type<unknown>) {
    return {
        schema: {
            allOf: [
                { $ref: getSchemaPath(BaseResponseDto) },
                { properties: { data: { $ref: getSchemaPath(type) } } },
            ],
        },
    }
}

function wrapPaginatedResponse(type: Type<unknown>) {
    return {
        schema: {
            allOf: [
                { $ref: getSchemaPath(BaseResponseDto) },
                {
                    properties: {
                        data: {
                            allOf: [
                                {
                                    $ref: getSchemaPath(
                                        PaginatedResponseDto<typeof type>,
                                    ),
                                },
                                {
                                    properties: {
                                        result: {
                                            type: 'array',
                                            items: {
                                                $ref: getSchemaPath(type),
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
            ],
        },
    }
}

// Generic filter parameter
function buildFilterParam() {
    return ApiQuery({
        name: 'filter',
        required: false,
        type: String,
        description:
            'Comma-separated key:value pairs to filter. Example: isActive:true,status:pending',
    })
}

export function ApiCrudDocs(options: ApiCrudDocsOptions) {
    const {
        protocol,
        summary,
        entity,

        statusCode,
        successDescription,
        errorType = ErrorResponseDto,
        tags,
        queryOptions = {},
        exceptions = [],
    } = options

    // Determine which type to wrap in response
    const wrapperType = options.dtoType || options.dataType!
    if (!wrapperType) {
        throw new Error(
            'ApiCrudDocs: either dtoType or dataType must be provided',
        )
    }

    const decorators: any[] = []

    const models = [BaseResponseDto, wrapperType]

    if (options.protocol === 'GETALL') {
        models.push(PaginatedResponseDto)
    }
    decorators.push(ApiExtraModels(...models))

    // Determine which entity to inspect for metadata

    const metaTarget = entity || wrapperType
    const metadata = getMetadataArgsStorage()
    const cols = metadata.columns
        .filter(c => c.target === metaTarget)
        .map(c => c.propertyName)
    const rels = metadata.relations
        .filter(r => r.target === metaTarget)
        .map(r => r.propertyName)

    // Default toggles
    const {
        relation = true,
        select = true,
        filter = true,
        pagination = true,
    } = queryOptions

    const defaults: Record<ApiProtocol, string> = {
        POST: 'Create a new resource',
        GET: 'Get resource by ID',
        PATCH: 'Update resource',
        DELETE: 'Delete resource',
        GETALL: 'List resources',
        PING: 'Health check',
    }

    // Tags
    if (tags?.length) decorators.push(ApiTags(...tags))

    // Operation summary
    decorators.push(ApiOperation({ summary: summary || defaults[protocol] }))

    if (protocol === 'PING') {
        decorators.push(
            ApiOkResponse({ description: successDescription || 'OK' }),
        )
        return applyDecorators(...decorators)
    }
    // Query params for GET and GETALL
    if (['GET', 'GETALL'].includes(protocol)) {
        if (relation && rels.length) {
            decorators.push(
                ApiQuery({
                    name: 'relation',
                    required: false,
                    description: 'Select which relations to include',
                    enum: rels,
                    isArray: true,
                }),
            )
        }
        if (select && cols.length) {
            decorators.push(
                ApiQuery({
                    name: 'select',
                    required: false,
                    description: 'Select which fields to return',
                    enum: cols,
                    isArray: true,
                }),
            )
        }
        if (filter) {
            decorators.push(buildFilterParam())
        }
    }

    // Pagination params only for GETALL
    if (protocol === 'GETALL' && pagination) {
        decorators.push(
            ApiQuery({
                name: 'page',
                required: false,
                type: Number,
                example: 0,
            }),
        )
        decorators.push(
            ApiQuery({
                name: 'take',
                required: false,
                type: Number,
                example: 20,
            }),
        )
    }

    // Determine success status code and description
    const code = statusCode ?? (protocol === 'POST' ? 201 : 200)
    const desc =
        successDescription ||
        (protocol === 'POST' ? 'Created successfully' : 'Request successful')

    // Wrap response: GETALL always paginated, others single
    const schema =
        protocol === 'GETALL'
            ? wrapPaginatedResponse(wrapperType)
            : wrapBaseResponse(wrapperType)

    // Success response
    if (protocol === 'POST') {
        decorators.push(ApiCreatedResponse({ description: desc, ...schema }))
    } else {
        decorators.push(ApiOkResponse({ description: desc, ...schema }))
    }

    // Standard errors
    decorators.push(
        ApiBadRequestResponse({
            description: 'Validation failed',
            type: errorType,
        }),
    )
    if (['GET', 'PATCH', 'DELETE'].includes(protocol)) {
        decorators.push(
            ApiNotFoundResponse({
                description: 'Resource not found',
                type: errorType,
            }),
        )
    }

    // Custom exceptions
    exceptions.forEach(({ description, type }) => {
        decorators.push(ApiUnauthorizedResponse({ description, type }))
        decorators.push(ApiForbiddenResponse({ description, type }))
        decorators.push(ApiInternalServerErrorResponse({ description, type }))
    })

    return applyDecorators(...decorators)
}
