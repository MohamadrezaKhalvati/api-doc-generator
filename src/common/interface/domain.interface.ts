import { ApiProperty } from '@nestjs/swagger'

export class IDomain {
    @ApiProperty({
        description: 'The id of the domain',
        example: '1',
    })
    id: number

    @ApiProperty({
        description: 'The created at date of the domain',
        example: '2021-01-01',
    })
    createdAt: Date

    @ApiProperty({
        description: 'The updated at date of the domain',
        example: '2021-01-01',
    })
    updatedAt: Date
}
