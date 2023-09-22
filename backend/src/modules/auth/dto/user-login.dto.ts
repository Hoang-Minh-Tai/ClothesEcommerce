import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class UserLoginDto {
  @ApiProperty({ example: 'taismile' })
  @IsNotEmpty()
  usernameOrEmail: string

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  password: string
}
