import { ApiProperty } from '@nestjs/swagger'

export class PaginatedResponseDto<T = any> {
    @ApiProperty({ type: [Object] })
    result: T[]

    @ApiProperty({
        type: 'object',
        properties: {
            currentPage: { type: 'number' },
            nextPage: { type: 'number' },
            prevPage: { type: 'number' },
            hasNextPage: { type: 'boolean' },
            hasPrevPage: { type: 'boolean' },
            lastPage: { type: 'number' },
            count: { type: 'number' },
            take: { type: 'number' },
        },
    })
    pagination: {
        currentPage: number
        nextPage: number
        prevPage: number
        hasNextPage: boolean
        hasPrevPage: boolean
        lastPage: number
        count: number
        take: number
    }
}
