import {
  Controller,
  Param,
  Post,
  Patch,
  Delete,
  Body,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger'
import { multerOptions } from '../image/multer.option'
import { CreateItemDto } from './dto/create-item.dto'
import { UpdateItemDto } from './dto/update-item.dto'
import { ItemService } from './item.service'
import { Roles } from 'src/utils/decorators/roles.decorator'
import { RolesGuard } from '../auth/roleguard'
import { ROLE_ENUM } from '../enums/role.enum'
import { AuthGuard } from '@nestjs/passport'

@ApiBearerAuth()
@ApiTags('Item')
@Roles(ROLE_ENUM.ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('admin/items')
export class AdminItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiOperation({ summary: 'Upload Images for an Item' })
  @Post('upload/:id')
  @UseInterceptors(FilesInterceptor('images', 10, multerOptions))
  uploadImages(@Param('id') itemId: string, @UploadedFiles() images: Array<Express.Multer.File>) {
    return this.itemService.uploadImages(itemId, images)
  }

  @ApiOperation({ summary: 'Create an Item' })
  @Post()
  @ApiBody({ type: CreateItemDto })
  async create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto)
  }

  @ApiOperation({ summary: 'Update an Item by ID' })
  @Patch(':id')
  @ApiParam({ name: 'id' })
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(id, updateItemDto)
  }

  @ApiOperation({ summary: 'Remove an Item by ID' })
  @Delete(':id')
  @ApiParam({ name: 'id' })
  async remove(@Param('id') id: string) {
    return this.itemService.remove(id)
  }
}
