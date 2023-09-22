import { Column, Entity, OneToOne } from 'typeorm'
import { CoreEntity } from '../core/core.entity'

@Entity()
export class Verification extends CoreEntity {
  @Column()
  token: string

  @Column()
  email: string
}
