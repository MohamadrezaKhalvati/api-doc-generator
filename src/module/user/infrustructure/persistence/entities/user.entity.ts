import { BaseEntity } from '@/common'
import { OrderEntity } from '@/module/order/infrastructure/persistence/entities/order.entity'
import { Column, Entity, OneToMany } from 'typeorm'
import { UserRole } from '../entity/role.enum'

@Entity()
export class UserEntity extends BaseEntity {
    @Column({ type: 'varchar', length: 255 })
    name: string

    @Column({ type: 'varchar', length: 255 })
    password: string

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string

    @Column({ type: 'varchar', length: 255, unique: true })
    username: string

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole

    @OneToMany(() => OrderEntity, order => order.user)
    orders: OrderEntity[]
}
