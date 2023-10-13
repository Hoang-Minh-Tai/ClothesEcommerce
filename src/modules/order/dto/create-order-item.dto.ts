import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator'

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  code: string

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number

  // You can include additional fields related to the order item, such as discounts, tax, etc.
}
