import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  ParseFilePipeBuilder,
  UsePipes,
  UploadedFiles,
  Req,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { FilesInterceptor } from '@nestjs/platform-express'
import { multerOptions } from '../image/multer.option'
import { CreateItemDto } from './dto/create-item.dto'
import { UpdateItemDto } from './dto/update-item.dto'
import { ItemService } from './item.service'

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('upload/:id')
  @UseInterceptors(FilesInterceptor('images', 10, multerOptions))
  uploadImages(@Param('id') itemId: string, @UploadedFiles() images: Array<Express.Multer.File>) {
    return this.itemService.uploadImages(itemId, images)
  }

  @Post('create')
  async create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto)
  }

  @Get('get')
  async findAll() {
    return this.itemService.findAll()
  }

  @Get('get/:id')
  async findOne(@Param('id') id: string) {
    return this.itemService.findOne(id)
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(id, updateItemDto)
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.itemService.remove(id)
  }
}
