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
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger'
import { OrderDomain } from './domain/order.domain'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { OrderEntity } from './infrastructure/persistence/entities/order.entity'
import { OrderService } from './order.service'

@Controller('order')
@ApiTags('Order')
@ApiBearerAuth()
@ApiExtraModels(
    BaseResponseDto,
    ErrorResponseDto,
    OrderDomain,
    PaginatedResponseDto,
)
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    @ApiCrudDocs({
        protocol: 'POST',
        summary: 'Create a new Order',
        dtoType: CreateOrderDto,
        dataType: OrderDomain,
        entity: OrderEntity,
    })
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.create(createOrderDto)
    }

    @Get()
    @ApiCrudDocs({
        protocol: 'GETALL',
        summary: 'Get all Orders',
        dtoType: OrderDomain,
        dataType: OrderDomain,
        entity: OrderEntity,
    })
    findAll() {
        return this.orderService.findAll()
    }

    @Get(':id')
    @ApiCrudDocs({
        protocol: 'GET',
        summary: 'Get an Order by ID',
        dtoType: OrderDomain,
        dataType: OrderDomain,
        entity: OrderEntity,
    })
    findOne(@Param('id') id: string) {
        return this.orderService.findOne(+id)
    }

    @Patch(':id')
    @ApiCrudDocs({
        protocol: 'PATCH',
        summary: 'Update an Order by ID',
        dtoType: UpdateOrderDto,
        dataType: OrderDomain,
        entity: OrderEntity,
    })
    update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.orderService.update(+id, updateOrderDto)
    }

    @Delete(':id')
    @ApiCrudDocs({
        protocol: 'DELETE',
        summary: 'Delete an Order by ID',
        dtoType: OrderDomain,
        dataType: OrderDomain,
        entity: OrderEntity,
    })
    remove(@Param('id') id: string) {
        return this.orderService.remove(+id)
    }
}
