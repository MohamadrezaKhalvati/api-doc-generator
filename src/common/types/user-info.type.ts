import { UserEntity } from '@/module/user/infrustructure/persistence/entities/user.entity'
import { PartialType } from '@nestjs/mapped-types'

export class UserInfoType extends PartialType(UserEntity) {}
