import { BaseRepository } from '@/common/base/repository/base.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '../entities/user.entity'
import { IUserRepository } from '../interface/user-repository.interface'

export class UserRepository
    extends BaseRepository<UserEntity>
    implements IUserRepository
{
    constructor(
        @InjectRepository(UserEntity)
        protected readonly repository: Repository<UserEntity>,
    ) {
        super(repository)
    }
}
