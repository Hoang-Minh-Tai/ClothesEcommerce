import { Controller, Post, Body, HttpException, HttpStatus, Get, Req, Res } from '@nestjs/common'
@Controller()
export class AppController {
  @Get()
  hello() {
    return 'Lom zom'
  }
}
