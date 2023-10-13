import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common'
import { CartService } from './cart.service'
import { UpdateItemQuantityDto } from './dto/update-item-quantity.dto'
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger'
import { Roles } from 'src/utils/decorators/roles.decorator'
import { ROLE_ENUM } from '../enums/role.enum'
import { AuthGuard } from '@nestjs/passport'
import { RolesGuard } from '../auth/roleguard'

@ApiTags('Cart')
@Controller('cart')
@Roles(ROLE_ENUM.USER)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Get Cart' })
  @Get()
  async getCart(@Req() req) {
    return this.cartService.getCart(req.user.id)
  }

  @ApiOperation({ summary: 'Update Cart Item Quantity' })
  @Post('update-quantity')
  @ApiBody({ type: UpdateItemQuantityDto })
  async updateCartItemQuantity(@Req() req, @Body() updateItemQuantityDto: UpdateItemQuantityDto) {
    return this.cartService.updateCartItemQuantity(req.user.id, updateItemQuantityDto)
  }
}
