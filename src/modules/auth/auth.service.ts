import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToClass } from 'class-transformer'
import { nanoid } from 'nanoid'
import { Repository } from 'typeorm'
import { MailService } from '../mail/mail.service'
import { EmailRegisterDto } from '../auth/dto/email-register.dto'
import { UserLoginDto } from '../auth/dto/user-login.dto'
import { User } from '../user/user.entity'
import { Verification } from './verification.entity'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { isEmail } from 'class-validator'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
    private readonly mailService: MailService,
    private jwtService: JwtService
  ) {}

  /* Method receives user's register data, create a new user and send verification email*/
  async register(userRegisterDto: EmailRegisterDto) {
    const tokenLength = 6

    // Check exist email and username
    const { email, username } = userRegisterDto
    const userByEmail = await this.userRepository.findOneBy({ email })
    if (userByEmail) {
      throw new BadRequestException('Email already exists.')
    }
    const userByUsername = await this.userRepository.findOneBy({ username })
    if (userByUsername) {
      throw new BadRequestException('Username already exists.')
    }

    // Create new user
    const user = plainToClass(User, userRegisterDto)
    user.newPassword = userRegisterDto.password
    await this.userRepository.save(user)

    // Create verification code
    const verification = new Verification()
    verification.token = nanoid(tokenLength)
    verification.email = userRegisterDto.email

    this.verificationRepository.save(verification)

    // Send email verification
    await this.mailService.verifyEmail(verification.email, verification.token)
    return `Email Verification has been sent to email ${verification.email}. For development, token: ${verification.token}`
  }

  async confirmEmail(token: string, email: string): Promise<boolean> {
    // Validate token
    const verification = await this.verificationRepository.findOneBy({ email })

    if (verification) {
      const user = await this.userRepository.findOneBy({ email })
      user.verified = true

      await this.userRepository.save(user)
      await this.verificationRepository.delete({ email })

      return true
    }
    return false
  }

  async login(userLoginDto: UserLoginDto) {
    const { usernameOrEmail, password } = userLoginDto

    let user: User
    if (isEmail(usernameOrEmail))
      user = await this.userRepository.findOneBy({ email: usernameOrEmail })
    else user = await this.userRepository.findOneBy({ username: usernameOrEmail })

    if (!user) throw new NotFoundException('Username not exist')
    console.log(password, user.password)
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!user.verified) throw new UnauthorizedException('Account not verified')
    if (!isPasswordValid) throw new UnauthorizedException('Wrong password')

    const token = await this.createTokens(user)
    return { ...token, ...user }
  }

  async findOne(username: string) {
    return this.userRepository.findOneBy({ username })
  }

  async createTokens(user: User) {
    const access_token = await this.jwtService.sign({
      id: user.id,
      role: user.role,
      type: 'access',
    })
    const refresh_token = await this.jwtService.sign({
      id: user.id,
      role: user.role,
      type: 'refresh',
    })

    return { access_token, refresh_token }
  }

  // Implement methods for user validation, token generation, etc.
  async validateUser(userId: string) {
    return this.userRepository.findOneBy({ id: userId })
  }
}
