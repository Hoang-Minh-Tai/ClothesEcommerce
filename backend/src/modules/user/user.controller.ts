import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common'
import { MailService } from '../mail/mail.service'
import { EmailRegisterDto } from './dto/email-register.dto'
import { UserService } from './user.service'

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService
  ) {}

  @Get('lomzom')
  test() {
    return this.mailService.sendEmail()
  }

  @Post('email/register')
  register(@Body() userRegisterDto: EmailRegisterDto) {
    return this.userService.register(userRegisterDto)
  }

  @Get('confirm/:token')
  @HttpCode(HttpStatus.OK)
  async confirmEmail(@Param('token') token: string, @Res() res: any) {
    const confirmed = await this.userService.confirmEmail(token)
    if (confirmed) {
      res.redirect('https://github.com/Hoang-Minh-Tai/SouvenirShop') // Replace with your frontend domain homepage
    } else {
      res.redirect('https://github.com/Hoang-Minh-Tai/SouvenirShop') // Replace with your error page
    }
  }
}
