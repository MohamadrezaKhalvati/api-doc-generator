import { DatabaseModule } from '@/shared/database'
import { Module } from '@nestjs/common'
import { IProductRepository } from './interface/product-interface.interface'
import { ProductRepository } from './repository/product.repository'

@Module({
    imports: [DatabaseModule],
    providers: [
        {
            provide: IProductRepository,
            useClass: ProductRepository,
        },
    ],
    exports: [IProductRepository],
})
export class ProductPersistenceModule {}
