import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator'
import { Transform } from 'class-transformer'

export class EmailRegisterDto {
  @ApiProperty({ example: 'TaiSmile' })
  @IsNotEmpty()
  @Transform(({ value }) => value?.toLowerCase())
  @MinLength(5)
  @MaxLength(20)
  username: string

  @ApiProperty({ example: 'test@gmail.com' })
  @Transform(({ value }) => value?.toLowerCase())
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @MaxLength(20)
  @IsStrongPassword({ minLength: 8, minNumbers: 1, minLowercase: 1 })
  password: string

  @ApiProperty()
  @IsPhoneNumber('VN', { message: 'Invalid phone number format' })
  phoneNumber: string

  @ApiProperty({ example: 'Tai' })
  @IsNotEmpty()
  @IsOptional()
  firstname: string

  @ApiProperty({ example: 'Smile' })
  @IsNotEmpty()
  @IsOptional()
  lastname: string
}
