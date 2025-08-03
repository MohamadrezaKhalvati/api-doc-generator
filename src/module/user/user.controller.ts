import { QueryParams, SingleQueryParams } from '@/common'
import {
    ApiCrudDocs,
    BaseResponseDto,
    ErrorResponseDto,
    PaginatedResponseDto,
} from '@/common/doc'
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common'
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger'
import { UserDomain } from './domain/user.domain'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserEntity } from './infrustructure/persistence/entities/user.entity'
import { UserService } from './user.service'

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
@ApiExtraModels(
    BaseResponseDto,
    ErrorResponseDto,
    UserDomain,
    PaginatedResponseDto,
)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('byAdmin')
    @ApiCrudDocs({
        protocol: 'POST',
        summary: 'Create a new user By Admin',
        dtoType: CreateUserDto,
        dataType: UserDomain,
    })
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    @Get()
    @ApiCrudDocs({
        protocol: 'GETALL',
        summary: 'Get all users',
        dtoType: UserDomain,
        dataType: UserDomain,
        entity: UserEntity,
        queryOptions: {
            relation: true,
            select: true,
            filter: true,
            pagination: true,
        },
    })
    findAll(@Query() query: QueryParams<UserDomain>) {
        return this.userService.findAll(query)
    }

    @Get(':id')
    @ApiCrudDocs({
        protocol: 'GET',
        summary: 'Get a user by ID',
        dtoType: UserDomain,
        dataType: UserDomain,
        entity: UserEntity,
    })
    findOne(
        @Param('id') id: string,
        @Query() query: SingleQueryParams<UserDomain>,
    ) {
        return this.userService.findOne(+id, query)
    }

    @Patch(':id')
    @ApiCrudDocs({
        protocol: 'PATCH',
        summary: 'Update a user by ID',
        dtoType: UpdateUserDto,
        dataType: UserDomain,
        entity: UserEntity,
    })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto)
    }

    @Delete(':id')
    @ApiCrudDocs({
        protocol: 'DELETE',
        summary: 'Delete a user by ID',
        dtoType: UserDomain,
        dataType: UserDomain,
        entity: UserEntity,
    })
    remove(@Param('id') id: string) {
        return this.userService.remove(+id)
    }
}
