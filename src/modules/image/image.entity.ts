import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CoreEntity } from '../core/core.entity'
import { Item } from '../item/item.entity'

@Entity()
export class Image extends CoreEntity {
  @Column()
  path: string

  @ManyToOne(() => Item, (item) => item.images)
  item: Item
}
