import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger'
import { Roles } from 'src/utils/decorators/roles.decorator'
import { RolesGuard } from '../auth/roleguard'
import { ROLE_ENUM } from '../enums/role.enum'
import { ItemService } from './item.service'

@ApiBearerAuth()
@ApiTags('Item')
@Roles(ROLE_ENUM.USER)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiOperation({ summary: 'Find All Items' })
  @Get()
  async findAll() {
    return this.itemService.findAll()
  }

  @ApiOperation({ summary: 'Find an Item by ID' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.itemService.findOne(id)
  }
}
