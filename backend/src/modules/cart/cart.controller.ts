import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common'
import { CartService } from './cart.service'
import { UpdateItemQuantityDto } from './dto/update-item-quantity.dto'

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  //   @Post('add-item')
  //   async addItemToCart(@Body() createCartItemDto: CreateCartItemDto) {
  //     return this.cartService.addItemToCart(createCartItemDto)
  //   }

  @Get()
  async getCart(@Req() Req) {
    return this.cartService.getCart(null)
  }

  @Post('update-quantity')
  async updateCartItemQuantity(@Req() req, @Body() updateItemQuantityDto: UpdateItemQuantityDto) {
    const userId = '94e2b121-68a3-40ff-baf3-31403ff253be'
    return this.cartService.updateCartItemQuantity(userId, updateItemQuantityDto)
  }
}
