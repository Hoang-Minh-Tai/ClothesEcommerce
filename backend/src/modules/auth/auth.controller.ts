import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { EmailRegisterDto } from './dto/email-register.dto'
import { UserLoginDto } from './dto/user-login.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto)
  }

  @Post('email/register')
  register(@Body() userRegisterDto: EmailRegisterDto) {
    return this.authService.register(userRegisterDto)
  }

  @Get('confirm/:token')
  @HttpCode(HttpStatus.OK)
  async confirmEmail(@Param('token') token: string, @Res() res: any) {
    const confirmed = await this.authService.confirmEmail(token)
    if (confirmed) {
      res.redirect('https://github.com/Hoang-Minh-Tai/SouvenirShop') // Replace with your frontend domain homepage
    } else {
      res.redirect('https://github.com/Hoang-Minh-Tai/SouvenirShop') // Replace with your error page
    }
  }
}
