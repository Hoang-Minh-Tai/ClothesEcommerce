import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'

export class UserLoginDto {
  @ApiProperty({ example: 'taismile' })
  @Transform(({ value }) => value?.toLowerCase())
  @IsNotEmpty()
  usernameOrEmail: string

  @ApiProperty({ example: 'password' })
  @Transform(({ value }) => value?.toLowerCase())
  @IsNotEmpty()
  password: string
}
