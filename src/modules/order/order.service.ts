import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToClass } from 'class-transformer'
import { Repository } from 'typeorm'
import { Cart } from '../cart/cart.entity'
import { CartService } from '../cart/cart.service'
import { UpdateItemQuantityDto } from '../cart/dto/update-item-quantity.dto'
import { Item } from '../item/item.entity'
import { CreateOrderItemDto } from './dto/create-order-item.dto'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dt'
import { OrderItem } from './order-item.entity'
import { Order } from './order.entity' // Import your Order entity

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    private readonly cartService: CartService,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>
  ) {}

  async getOrder(id: string): Promise<Order> {
    const order = await this.orderRepository.findOneBy({ id })
    if (!order) {
      throw new NotFoundException('Order not found')
    }
    return order
  }

  async createOrder(userId: string, createOrderDto: CreateOrderDto) {
    const newOrder = this.orderRepository.create()
    newOrder.orderItems = []

    const cart = await this.cartService.getCart(userId)

    let totalPrice = 0
    cart.forEach(async (element) => {
      const quantity = element.quantity
      const item = element.item
      const discount = item.discount ? item.discount.amount : 0
      const price = (item.price * quantity * (100 - discount)) / 100

      const orderItem = this.orderItemRepository.create()
      orderItem.name = item.name
      orderItem.code = item.code
      orderItem.price = item.price
      orderItem.quantity = quantity
      console.log(orderItem)

      newOrder.orderItems.push(orderItem)

      element.item.quantity -= quantity
      await this.cartRepository.save(element)

      totalPrice += price
    })
    await this.cartRepository.remove(cart)

    Object.assign(newOrder, { ...createOrderDto, totalPrice })

    return await this.orderRepository.save(newOrder)

    // return this.orderRepository.save(newOrder)
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
