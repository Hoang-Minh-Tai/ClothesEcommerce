import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsStrongPassword,
  MinLength,
  Validate,
} from 'class-validator'
import { Transform } from 'class-transformer'

export class EmailRegisterDto {
  @ApiProperty({ example: 'TaiSmile' })
  @IsNotEmpty()
  @Transform(({ value }) => value?.toLowerCase().trim())
  @MinLength(7)
  username: string

  @ApiProperty({ example: 'test@gmail.com' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @MinLength(6)
  // @IsStrongPassword()
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
