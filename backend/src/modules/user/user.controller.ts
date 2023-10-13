import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Roles } from 'src/utils/decorators/roles.decorator'
import { RolesGuard } from '../auth/roleguard'
import { ROLE_ENUM } from '../enums/role.enum'
import { UserService } from './user.service'

@Controller('user')
@Roles(ROLE_ENUM.USER)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  test() {
    return 'hellomzom'
  }
}
