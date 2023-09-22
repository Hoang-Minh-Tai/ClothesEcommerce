import { BadRequestException, HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { nanoid } from 'nanoid' // Import nanoid/async
import { Repository } from 'typeorm'
import { MailService } from '../mail/mail.service'
import { EmailRegisterDto } from './dto/email-register.dto'
import { User } from './user.entity'
import { Verification } from './verification.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
    private readonly mailService: MailService
  ) {}

  /* Method receives user's register data, create a new user and send verification email*/
  async register(userRegisterDto: EmailRegisterDto) {
    const tokenLength = 6
    // throw new HttpException('What now', 444)

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
    await this.userRepository.save({ ...userRegisterDto })

    // Create verification code
    const verification = new Verification()
    verification.token = nanoid(tokenLength)
    verification.email = userRegisterDto.email

    this.verificationRepository.save(verification)

    // Send email verification
    await this.mailService.verifyEmail(verification.email, verification.token)
    return `Email Verification has been sent to email ${verification.email}`
  }

  async confirmEmail(token: string): Promise<boolean> {
    // Validate token
    const verification = await this.verificationRepository.findOneBy({ token })

    if (verification) {
      const user = await this.userRepository.findOneBy({ email: verification.email })
      user.verified = true

      await this.userRepository.save(user)
      await this.verificationRepository.delete({ email: user.email })

      return true
    }
    return false
  }
}
