import { IsInt, Min } from 'class-validator'
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Item } from '../item/item.entity'
import { User } from '../user/user.entity'

@Entity()
export class Cart {
  @PrimaryColumn()
  userId: string

  @ManyToOne(() => User)
  user: User

  @PrimaryColumn()
  itemId: string

  @ManyToOne(() => Item, { eager: true, cascade: true })
  item: Item

  @Column()
  @IsInt()
  @Min(0)
  quantity: number
}
