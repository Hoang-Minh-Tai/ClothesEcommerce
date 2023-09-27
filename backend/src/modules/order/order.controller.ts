import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { OrderService } from './order.service' // Import your OrderService
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto' // Import your DTOs

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return this.orderService.getOrder(id)
  }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto)
  }

  @Put(':id')
  async updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateOrder(id, updateOrderDto)
  }
}
