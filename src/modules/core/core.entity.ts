import { instanceToPlain } from 'class-transformer'
import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export abstract class CoreEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  create_at: Date

  @UpdateDateColumn()
  update_at: Date

  toJSON() {
    return instanceToPlain(this)
  }
}
