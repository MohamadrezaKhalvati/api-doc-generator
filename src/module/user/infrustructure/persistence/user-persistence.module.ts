import { DatabaseModule } from '@/shared/database'
import { Module } from '@nestjs/common'
import { IUserRepository } from './interface/user-repository.interface'
import { UserRepository } from './repository/user.repository'

@Module({
    imports: [DatabaseModule],
    providers: [
        {
            provide: IUserRepository,
            useClass: UserRepository,
        },
    ],
    exports: [IUserRepository],
})
export class UserPersistenceModule {}
