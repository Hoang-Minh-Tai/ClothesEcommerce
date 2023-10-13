import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Cart } from './cart.entity'
import { UpdateItemQuantityDto } from './dto/update-item-quantity.dto'

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>
  ) {}

  //   async addItemToCart(createCartItemDto: CreateCartItemDto): Promise<Cart> {
  //     // You should add validation and error handling here as needed.

  //     // Check if the item already exists in the user's cart.
  //     const existingCartItem = await this.cartRepository.findOne({
  //       userId: createCartItemDto.userId,
  //       itemId: createCartItemDto.itemId,
  //     })

  //     if (existingCartItem) {
  //       // If the item already exists, update its quantity.
  //       existingCartItem.quantity += createCartItemDto.quantity
  //       return this.cartRepository.save(existingCartItem)
  //     } else {
  //       // If the item doesn't exist, create a new cart item.
  //       const newCartItem = this.cartRepository.create(createCartItemDto)
  //       return this.cartRepository.save(newCartItem)
  //     }
  //   }

  async updateCartItemQuantity(
    userId: string,
    updateItemQuantityDto: UpdateItemQuantityDto
  ): Promise<Cart> {
    const { itemId, quantity } = updateItemQuantityDto

    // Find the cart item by userId and itemId.
    let cartItem = await this.cartRepository.findOneBy({ userId, itemId })

    if (!cartItem && quantity !== 0) {
      cartItem = this.cartRepository.create({ userId, itemId })
    }

    // Update the quantity of the cart item.
    if (quantity === 0) {
      this.cartRepository.delete({ userId, itemId })
      return cartItem
    }
    cartItem.quantity = quantity

    return this.cartRepository.save(cartItem)
  }

  async getCart(userId: string): Promise<Cart[]> {
    // Find all item in cart, apply any discount and sum up
    const itemList = this.cartRepository.findBy({ userId })
    return itemList
  }

  async clearCart(userId: string) {
    await this.cartRepository.delete({ userId })
  }
}
