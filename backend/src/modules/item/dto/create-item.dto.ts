import { IsNotEmpty, IsNumber, IsString, IsEnum, IsOptional, Min, IsInt } from 'class-validator'
import { CATEGORY_ENUM } from 'src/modules/enums/category.enum'

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number

  @IsNotEmpty()
  @IsString()
  code: string

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  quantity: number

  @IsOptional()
  @IsString()
  introduction?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsNotEmpty()
  @IsEnum(CATEGORY_ENUM)
  category: CATEGORY_ENUM
}
