import { OrderEntity } from '@/module/order/infrastructure/persistence/entities/order.entity'
import { ProductEntity } from '@/module/product/infrustructure/persistence/entities/product.entity'
import { UserEntity } from '@/module/user/infrustructure/persistence/entities/user.entity'

export const TypeOrmModels = [ProductEntity, OrderEntity, UserEntity]
