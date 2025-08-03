import { PartialType } from '@nestjs/swagger'
import { ProductEntity } from '../infrustructure/persistence/entities/product.entity'

export class CreateProductDto extends PartialType(ProductEntity) {}
