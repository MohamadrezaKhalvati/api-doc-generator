import { Module } from '@nestjs/common'
import { UserPersistenceModule } from './infrustructure/persistence/user-persistence.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
    imports: [UserPersistenceModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserPersistenceModule],
})
export class UserModule {}
