import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, IsEnum, IsOptional, Min, IsInt } from 'class-validator'
import { CATEGORY_ENUM } from 'src/modules/enums/category.enum'

export class CreateItemDto {
  @ApiProperty({ example: 'ItemName' })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({ example: 10.99 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number

  @ApiProperty({ example: 'ItemCode' })
  @IsNotEmpty()
  @IsString()
  code: string

  @ApiProperty({ example: 100 })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  quantity: number

  @ApiProperty({ example: 'Item introduction' })
  @IsOptional()
  @IsString()
  introduction?: string

  @ApiProperty({ example: 'Item description' })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({ example: 'CategoryEnumValue' })
  @IsNotEmpty()
  @IsEnum(CATEGORY_ENUM)
  category: CATEGORY_ENUM
}
