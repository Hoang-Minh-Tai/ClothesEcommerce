// item.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateItemDto } from './dto/create-item.dto'
import { UpdateItemDto } from './dto/update-item.dto'
import { Item } from './item.entity'

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>
  ) {}

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find()
  }

  async findOne(id: string): Promise<Item | undefined> {
    return this.itemRepository.findOneBy({ id })
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const newItem = this.itemRepository.create(createItemDto)
    return this.itemRepository.save(newItem)
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item | undefined> {
    const existingItem = await this.itemRepository.findOneBy({ id })
    if (!existingItem) {
      throw new NotFoundException('Item not found')
    }

    // Update the existing item with the new data.
    Object.assign(existingItem, updateItemDto)

    return this.itemRepository.save(existingItem)
  }

  async remove(id: string): Promise<Item | undefined> {
    const existingItem = await this.itemRepository.findOneBy({ id })
    if (!existingItem) {
      throw new NotFoundException('Item not found')
    }

    await this.itemRepository.remove(existingItem)
    return existingItem
  }
}
