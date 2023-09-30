import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { OrderService } from './order.service' // Import your OrderService

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return this.orderService.getOrder(id)
  }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(null, createOrderDto)
  }

  @Put(':id')
  async updateOrder(@Param('id') id: string, @Body() updateOrderDto: CreateOrderDto) {
    return this.orderService.updateOrder(id, updateOrderDto)
  }
}
