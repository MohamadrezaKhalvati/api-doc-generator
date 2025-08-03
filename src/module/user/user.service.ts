import { QueryParams, SingleQueryParams } from '@/common'
import { Injectable, NotFoundException } from '@nestjs/common'
import { UserDomain } from './domain/user.domain'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { IUserRepository } from './infrustructure/persistence/interface/user-repository.interface'

@Injectable()
export class UserService {
    constructor(protected readonly userRepository: IUserRepository) {}

    create(input: CreateUserDto) {}

    findOne(id: number, query: SingleQueryParams<UserDomain>) {
        return this.userRepository.findOne(id, query)
    }

    findAll(query: QueryParams<UserDomain>) {
        console.log('query', query)
        return this.userRepository.findAll(query)
    }

    async update(id: number, input: UpdateUserDto) {
        const user = await this.userRepository.exists({ id })

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return this.userRepository.update(id, input)
    }

    async remove(id: number) {
        const user = await this.userRepository.exists({ id })

        if (!user) {
            throw new NotFoundException('User not found')
        }

        await this.userRepository.softDelete(id)
    }
}
