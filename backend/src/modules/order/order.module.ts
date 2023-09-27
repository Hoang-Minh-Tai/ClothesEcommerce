import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderItem } from './order-item.entity'
import { OrderController } from './order.controller'
import { Order } from './order.entity'
import { OrderService } from './order.service'

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
