import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm'
import { OrderItem } from './order-item.entity' // Import your OrderItem entity
import { CoreEntity } from '../core/core.entity'
import { User } from '../user/user.entity'
import { STATUS_ENUM } from '../enums/order-status.enum'

@Entity()
export class Order extends CoreEntity {
  @ManyToOne(() => User)
  user: User

  @Column({ type: 'enum', enum: STATUS_ENUM, default: STATUS_ENUM.PENDING })
  status: string

  @Column()
  shippingAddress: string

  @Column()
  billingAddress: string

  @Column()
  totalPrice: number

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  orderItems: OrderItem[]

  @Column({ nullable: true })
  deliveryMethod: string

  @Column({ type: 'text', nullable: true })
  notes: string

  @Column({ nullable: true })
  trackingNumber: string
}
