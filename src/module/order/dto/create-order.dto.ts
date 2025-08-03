import { PartialType } from '@nestjs/swagger'
import { OrderEntity } from '../infrastructure/persistence/entities/order.entity'

export class CreateOrderDto extends PartialType(OrderEntity) {}
