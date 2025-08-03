import { IMapper } from '@/common/interface/mapper.interface'
import { OrderDomain } from '@/module/order/domain/order.domain'
import { OrderEntity } from '../entities/order.entity'

export class OrderMapper implements IMapper<OrderDomain, OrderEntity> {
    toPersistence(domain: OrderDomain): Partial<OrderEntity> {
        const entity = new OrderEntity()
        entity.id = domain.id
        entity.createdAt = domain.createdAt
        entity.updatedAt = domain.updatedAt
        return entity
    }
    toDomain(entity: OrderEntity): OrderDomain {
        const domain = new OrderDomain()
        domain.id = entity.id
        domain.createdAt = entity.createdAt
        domain.updatedAt = entity.updatedAt
        return domain
    }
}
