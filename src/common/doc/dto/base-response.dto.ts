import { ApiProperty } from '@nestjs/swagger'

export class BaseResponseDto<T = any> {
    @ApiProperty({ example: 200 })
    statusCode: number

    @ApiProperty()
    data: T

    @ApiProperty({ example: false })
    error: boolean

    @ApiProperty({ nullable: true })
    errorData: any

    @ApiProperty({ example: new Date().toISOString() })
    timestamp: string
}
