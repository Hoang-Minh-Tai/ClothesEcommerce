import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  MinLength,
  Validate,
} from 'class-validator'
import { Transform } from 'class-transformer'

export class EmailRegisterDto {
  @ApiProperty({ example: 'taismile' })
  @IsNotEmpty()
  @Transform(({ value }) => value?.toLowerCase().trim())
  username: string

  @ApiProperty({ example: 'test@gmail.com' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @MinLength(6)
  password: string

  @ApiProperty()
  @IsPhoneNumber('VN', { message: 'Invalid phone number format' })
  phone_number: string

  @ApiProperty({ example: 'Tai' })
  @IsNotEmpty()
  @IsOptional()
  first_name: string

  @ApiProperty({ example: 'Smile' })
  @IsNotEmpty()
  @IsOptional()
  last_name: string
}
