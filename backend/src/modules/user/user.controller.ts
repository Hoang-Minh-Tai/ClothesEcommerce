import { Controller, Get } from '@nestjs/common'

@Controller()
export class UserController {
  @Get('/ga')
  hello() {
    return 'lom zm'
  }
}
