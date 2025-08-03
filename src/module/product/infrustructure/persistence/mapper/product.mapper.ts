import { IMapper } from '@/common/interface/mapper.interface'
import { ProductDomain } from '@/module/product/domain/product.domain'
import { ProductEntity } from '../entities/product.entity'

export class ProductMapper implements IMapper<ProductDomain, ProductEntity> {
    toPersistence(domain: ProductDomain): Partial<ProductEntity> {
        const entity = new ProductEntity()
        entity.id = domain.id
        entity.createdAt = domain.createdAt
        entity.updatedAt = domain.updatedAt
        return entity
    }
    toDomain(entity: ProductEntity): ProductDomain {
        const domain = new ProductDomain()
        domain.id = entity.id
        domain.createdAt = entity.createdAt
        domain.updatedAt = entity.updatedAt
        return domain
    }
}
