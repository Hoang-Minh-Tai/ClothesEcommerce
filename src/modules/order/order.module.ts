import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cart } from '../cart/cart.entity'
import { CartModule } from '../cart/cart.module'
import { CartService } from '../cart/cart.service'
import { Item } from '../item/item.entity'
import { OrderItem } from './order-item.entity'
import { OrderController } from './order.controller'
import { Order } from './order.entity'
import { OrderService } from './order.service'

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Item, Cart]), CartModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
