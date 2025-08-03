import { BaseRepository } from '@/common/base/repository/base.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProductEntity } from '../entities/product.entity'
import { IProductRepository } from '../interface/product-interface.interface'

export class ProductRepository
    extends BaseRepository<ProductEntity>
    implements IProductRepository
{
    constructor(
        @InjectRepository(ProductEntity)
        protected readonly repository: Repository<ProductEntity>,
    ) {
        super(repository)
    }
}
