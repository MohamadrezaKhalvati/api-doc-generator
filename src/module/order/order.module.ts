import { Module } from '@nestjs/common'
import { OrderPersistenceModule } from './infrastructure/persistence/order-persistence.module'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Module({
    imports: [OrderPersistenceModule],
    controllers: [OrderController],
    providers: [OrderService],
    exports: [OrderPersistenceModule],
})
export class OrderModule {}
