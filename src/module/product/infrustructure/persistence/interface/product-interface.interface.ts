import { IBaseRepository } from '@/common/base/interface/base-repository.interface'
import { ProductEntity } from '../entities/product.entity'

export abstract class IProductRepository extends IBaseRepository<ProductEntity> {}
