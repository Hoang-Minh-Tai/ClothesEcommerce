import { Column, Entity, OneToMany, OneToOne } from 'typeorm'
import { CoreEntity } from '../core/core.entity'
import { Discount } from '../discount/discount.entity'
import { CATEGORY_ENUM } from '../enums/category.enum'
import { Image } from '../image/image.entity'

@Entity()
export class Item extends CoreEntity {
  @Column()
  name: string

  @Column()
  price: number

  @Column()
  code: string

  @Column()
  quantity: number

  @Column({ nullable: true })
  introduction: string

  @Column({ nullable: true })
  description: string

  @Column({ type: 'enum', enum: CATEGORY_ENUM })
  category: CATEGORY_ENUM

  @OneToMany(() => Image, (image) => image.item)
  images: Image[]

  @OneToOne(() => Discount)
  discount: Discount
}
