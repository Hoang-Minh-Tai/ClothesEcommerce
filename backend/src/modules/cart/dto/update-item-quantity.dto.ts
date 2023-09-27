import { IsInt, IsUUID } from 'class-validator'

export class UpdateItemQuantityDto {
  @IsUUID()
  itemId: string

  @IsInt()
  quantity: number
}
