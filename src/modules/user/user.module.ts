import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MailService } from '../mail/mail.service'
import { UserController } from './user.controller'
import { User } from './user.entity'
import { UserService } from './user.service'
import { Verification } from '../auth/verification.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Verification])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
