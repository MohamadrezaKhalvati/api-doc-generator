import { Module } from '@nestjs/common'
import { ProductPersistenceModule } from './infrustructure/persistence/product-persistence.module'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
    imports: [ProductPersistenceModule],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductPersistenceModule],
})
export class ProductModule {}
