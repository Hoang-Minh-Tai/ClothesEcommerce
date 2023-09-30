import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { CoreEntity } from '../core/core.entity'
import { Order } from './order.entity'

@Entity()
export class OrderItem extends CoreEntity {
  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order

  @Column()
  name: string

  @Column()
  code: string

  @Column()
  quantity: number

  @Column('decimal', { precision: 10, scale: 2 })
  price: number
}
