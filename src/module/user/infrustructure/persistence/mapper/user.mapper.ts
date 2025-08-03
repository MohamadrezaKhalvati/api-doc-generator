import { IMapper } from '@/common/interface/mapper.interface'

import { UserDomain } from '@/module/user/domain/user.domain'
import { NotFoundException } from '@nestjs/common'
import { UserEntity } from '../entities/user.entity'

export class UserMapper implements IMapper<UserDomain, UserEntity> {
    toDomain(entity: UserEntity): UserDomain {
        if (entity == null) throw new NotFoundException()

        return {
            id: entity.id,
            name: entity.name,
            email: entity.email,
            role: entity.role,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        }
    }
    toPersistence(domain: UserDomain): Partial<UserEntity> {
        return {
            id: domain.id,
            name: domain.name,
            email: domain.email,
            role: domain.role,
            username: domain.role,
        }
    }
}
