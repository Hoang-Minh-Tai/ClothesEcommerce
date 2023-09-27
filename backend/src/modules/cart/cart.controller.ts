import { Body, Controller, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common'
import { CartService } from './cart.service'
import { UpdateItemQuantityDto } from './dto/update-item-quantity.dto'

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  //   @Post('add-item')
  //   async addItemToCart(@Body() createCartItemDto: CreateCartItemDto) {
  //     return this.cartService.addItemToCart(createCartItemDto)
  //   }

  @Post('update-quantity/:itemId')
  async updateCartItemQuantity(@Req() req, @Body() updateItemQuantityDto: UpdateItemQuantityDto) {
    const userId = req.getUser
    return this.cartService.updateCartItemQuantity(userId, updateItemQuantityDto)
  }
}
