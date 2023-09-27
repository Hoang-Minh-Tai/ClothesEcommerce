import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  IsPositive,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'
import { CreateOrderItemDto } from './create-order-item.dto' // Import your CreateOrderItemDto

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  userId: string

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[]

  // Other order-related properties can be added here if needed.
}
