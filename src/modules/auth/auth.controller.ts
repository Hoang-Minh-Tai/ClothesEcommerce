import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { EmailRegisterDto } from './dto/email-register.dto'
import { UserLoginDto } from './dto/user-login.dto'

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User - Login' })
  @Post('login')
  login(@Body() userLoginDto: UserLoginDto) {
    console.log(userLoginDto)

    return this.authService.login(userLoginDto)
  }

  @ApiOperation({ summary: 'User - Create new account' })
  @Post('email/register')
  register(@Body() userRegisterDto: EmailRegisterDto) {
    return this.authService.register(userRegisterDto)
  }

  @ApiOperation({ summary: 'User - Verify account' })
  @Get('confirm')
  @HttpCode(HttpStatus.OK)
  async confirmEmail(
    @Query('token') token: string,
    @Query('email') email: string,
    @Res() res: any
  ) {
    const confirmed = await this.authService.confirmEmail(token, email)
    if (confirmed) {
      res.redirect('https://github.com/Hoang-Minh-Tai/SouvenirShop')
    } else {
      res.redirect('https://github.com/Hoang-Minh-Tai/SouvenirShop')
    }
  }
}
