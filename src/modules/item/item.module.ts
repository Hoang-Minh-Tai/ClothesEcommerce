import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Image } from '../image/image.entity'
import { AdminItemController } from './admin.item.controller'
import { ItemController } from './item.controller'
import { Item } from './item.entity'
import { ItemService } from './item.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Item, Image]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [ItemController, AdminItemController],
  providers: [ItemService],
})
export class ItemModule {}
