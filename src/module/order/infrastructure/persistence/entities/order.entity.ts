import { BaseEntity } from '@/common'
import { ProductEntity } from '@/module/product/infrustructure/persistence/entities/product.entity'
import { UserEntity } from '@/module/user/infrustructure/persistence/entities/user.entity'
import { Column, Entity, JoinTable, ManyToOne, Relation } from 'typeorm'

@Entity()
export class OrderEntity extends BaseEntity {
    @ManyToOne(() => UserEntity, user => user.orders, { nullable: false })
    user: UserEntity

    @Column({ type: 'int' })
    productId: number

    @ManyToOne(() => ProductEntity, product => product.orders)
    @JoinTable({
        joinColumn: { name: 'productId' },
    })
    product: Relation<ProductEntity>
}
