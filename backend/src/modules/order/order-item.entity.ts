import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Order } from './order.entity'

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number

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

  // You can include additional fields related to the order item, such as discounts, tax, etc.
}
