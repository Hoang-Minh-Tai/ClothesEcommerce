import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'
import { CreateItemDto } from './dto/create-item.dto'
import { UpdateItemDto } from './dto/update-item.dto'
import { ItemService } from './item.service'

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('getAll')
  async findAll() {
    return this.itemService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.itemService.findOne(id)
  }

  @Post('create')
  async create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto)
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
