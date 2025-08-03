import { BaseRepository } from '@/common/base/repository/base.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { OrderEntity } from '../entities/order.entity'
import { IOrderRepository } from '../interface/order-repositroy.interface'

export class OrderRepository
    extends BaseRepository<OrderEntity>
    implements IOrderRepository
{
    constructor(
        @InjectRepository(OrderEntity)
        protected readonly repository: Repository<OrderEntity>,
    ) {
        super(repository)
    }
}
