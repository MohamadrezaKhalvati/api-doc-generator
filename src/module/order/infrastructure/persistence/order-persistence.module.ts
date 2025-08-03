import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderEntity } from './entities/order.entity'
import { IOrderRepository } from './interface/order-repositroy.interface'
import { OrderRepository } from './repository/order.repositroy'

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity])],
    providers: [
        {
            provide: IOrderRepository,
            useClass: OrderRepository,
        },
    ],
    exports: [IOrderRepository],
})
export class OrderPersistenceModule {}
