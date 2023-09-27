import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Order } from './order.entity' // Import your Order entity
import { CreateOrderDto, UpdateOrderDto } from './order.dto' // Import your DTOs

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  async getOrder(id: string): Promise<Order> {
    const order = await this.orderRepository.findOneBy({ id })
    if (!order) {
      throw new NotFoundException('Order not found')
    }
    return order
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = this.orderRepository.create(createOrderDto)
    return this.orderRepository.save(newOrder)
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const existingOrder = await this.orderRepository.findOneBy({ id })
    if (!existingOrder) {
      throw new NotFoundException('Order not found')
    }

    // Update the order properties based on updateOrderDto.
    // You should implement the logic for updating order details here.

    return this.orderRepository.save(existingOrder)
  }
}
