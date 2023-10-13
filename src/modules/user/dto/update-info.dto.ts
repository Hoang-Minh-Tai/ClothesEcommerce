import { PartialType, PickType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsOptional } from 'class-validator'
import { EmailRegisterDto } from 'src/modules/auth/dto/email-register.dto'

export class UpdateInfoDto extends PickType(EmailRegisterDto, [
  'username',
  'firstname',
  'lastname',
] as const) {}
