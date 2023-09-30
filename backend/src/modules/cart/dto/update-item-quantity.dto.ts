import { IsInt, IsUUID, Min } from 'class-validator'

export class UpdateItemQuantityDto {
  @IsUUID()
  itemId: string

  @IsInt()
  @Min(0)
  quantity: number
}
