import { BaseEntity } from '@/common'
import { OrderEntity } from '@/module/order/infrastructure/persistence/entities/order.entity'
import { Column, Entity, OneToMany, Relation } from 'typeorm'

@Entity()
export class ProductEntity extends BaseEntity {
    @Column({ length: 200 })
    name: string

    @Column('decimal')
    price: number

    @OneToMany(() => OrderEntity, order => order.product)
    orders: Relation<OrderEntity>[]
}
