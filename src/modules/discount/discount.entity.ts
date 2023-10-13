import { Column, Entity, OneToOne } from 'typeorm'
import { CoreEntity } from '../core/core.entity'
import { Item } from '../item/item.entity'

@Entity()
export class Discount extends CoreEntity {
  @Column()
  itemId: string

  @OneToOne(() => Item)
  item: Item

  @Column()
  amount: number

  @Column()
  expired_date: Date
}
