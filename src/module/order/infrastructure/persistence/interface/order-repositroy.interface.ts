import { IBaseRepository } from '@/common/base/interface/base-repository.interface'
import { OrderEntity } from '../entities/order.entity'

export abstract class IOrderRepository extends IBaseRepository<OrderEntity> {}
