import { IDomain } from '@/common'
import { ApiProperty } from '@nestjs/swagger'
import { UserRole } from '../infrustructure/persistence/entity/role.enum'

export class UserDomain extends IDomain {
    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe',
    })
    name: string

    @ApiProperty({
        description: 'The email of the user',
        example: 'john.doe@example.com',
    })
    email: string

    @ApiProperty({
        description: 'The role of the user',
        example: UserRole.USER,
    })
    role: UserRole
}
