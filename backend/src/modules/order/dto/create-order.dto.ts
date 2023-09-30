import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsInt,
  Min,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator'
import { Type } from 'class-transformer'
import { CreateOrderItemDto } from './create-order-item.dto' // Import your CreateOrderItemDto

export class CreateOrderDto {
  @IsNotEmpty()
  shippingAddress: string

  @IsNotEmpty()
  billingAddress: string

  @IsPhoneNumber('VN', { message: 'Invalid phone number format' })
  trackingNumber: string

  @IsOptional()
  @IsNotEmpty()
  note: string
  // Other order-related properties can be added here if needed.
}
