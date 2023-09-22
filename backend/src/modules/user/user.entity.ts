import { IsDate, IsEmail, IsPhoneNumber, maxDate, MaxDate, Min } from 'class-validator'
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm'
import { CoreEntity } from '../core/core.entity'
import * as bcrypt from 'bcryptjs'
import { GENDER_ENUM } from '../enums/gender.enum'
import { ROLE_ENUM } from '../enums/role.enum'

@Entity()
export class User extends CoreEntity {
  /* -----------------------mandatory----------------------- */
  @Column({ default: 'lomzom' })
  first_name: string

  @Column({ default: 'lomzom' })
  last_name: string

  /* ----------------------optional------------------------- */

  // @Column()
  // @IsDate()
  // @MaxDate(new Date('2020-12-31'))
  // dob: Date

  @Column()
  username: string

  @Column()
  password: string

  @Column({ type: 'enum', enum: ROLE_ENUM, default: ROLE_ENUM.USER })
  role: ROLE_ENUM

  @Column({ unique: true })
  @IsEmail()
  email: string

  @Column({ unique: true })
  phone_number: string

  @Column({ default: false })
  receiveInfoAndPolicy: boolean

  @Column({ default: false })
  verified: boolean

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (!this.password) return
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
  }
}
