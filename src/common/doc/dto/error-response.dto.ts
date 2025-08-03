import { ApiProperty } from '@nestjs/swagger'

export class ErrorResponseDto {
    @ApiProperty({ example: false })
    error: boolean

    @ApiProperty({ example: 400 })
    statusCode: number

    @ApiProperty({ nullable: true })
    errorData: any

    @ApiProperty({ example: new Date().toISOString() })
    timestamp: string
}
