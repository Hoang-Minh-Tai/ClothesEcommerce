import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsUUID, Min } from 'class-validator'

export class UpdateItemQuantityDto {
  @ApiProperty({ example: 'e33f186d-5041-4df5-9e6f-47fc92a27f22' })
  @IsUUID()
  itemId: string

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  quantity: number
}
