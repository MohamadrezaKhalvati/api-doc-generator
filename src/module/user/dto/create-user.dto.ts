import { PartialType } from '@nestjs/swagger'
import { UserEntity } from '../infrustructure/persistence/entities/user.entity'

export class CreateUserDto extends PartialType(UserEntity) {}
