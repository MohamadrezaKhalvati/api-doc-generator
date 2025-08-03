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
} from '@nestjs/common'
import { ApiExtraModels, ApiTags } from '@nestjs/swagger'
import { UserDomain } from '../user/domain/user.domain'
import { ProductDomain } from './domain/product.domain'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductEntity } from './infrustructure/persistence/entities/product.entity'
import { ProductService } from './product.service'

@Controller('product')
@ApiTags('Product')
@ApiExtraModels(
    BaseResponseDto,
    ErrorResponseDto,
    UserDomain,
    PaginatedResponseDto,
)
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    @ApiCrudDocs({
        protocol: 'POST',
        summary: 'Create a new Product',
        dtoType: CreateProductDto,
        dataType: ProductDomain,
    })
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto)
    }

    @Get()
    @ApiCrudDocs({
        protocol: 'GETALL',
        summary: 'Get all products',
        dtoType: ProductDomain,
        dataType: ProductDomain,
        entity: ProductEntity,
        queryOptions: {
            relation: true,
            select: true,
            filter: true,
            pagination: true,
        },
    })
    findAll() {
        return this.productService.findAll()
    }

    @Get(':id')
    @ApiCrudDocs({
        protocol: 'GET',
        summary: 'Get a product by id',
        dtoType: ProductDomain,
        dataType: ProductDomain,
        entity: ProductEntity,
        queryOptions: {
            relation: true,
        },
    })
    findOne(@Param('id') id: string) {
        return this.productService.findOne(+id)
    }

    @Patch(':id')
    @ApiCrudDocs({
        protocol: 'PATCH',
        summary: 'Update a product',
        dtoType: UpdateProductDto,
        dataType: ProductDomain,
    })
    update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return this.productService.update(+id, updateProductDto)
    }

    @Delete(':id')
    @ApiCrudDocs({
        protocol: 'DELETE',
        summary: 'Delete a product',
        dtoType: ProductDomain,
        dataType: ProductDomain,
    })
    remove(@Param('id') id: string) {
        return this.productService.remove(+id)
    }
}
