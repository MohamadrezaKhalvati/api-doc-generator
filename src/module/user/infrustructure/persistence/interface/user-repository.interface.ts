import { IBaseRepository } from '@/common/base/interface/base-repository.interface'
import { UserEntity } from '../entities/user.entity'

export abstract class IUserRepository extends IBaseRepository<UserEntity> {}
