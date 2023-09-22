import { IsDate, IsEmail, IsPhoneNumber, maxDate, MaxDate, Min, MinLength } from 'class-validator'
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm'
import { CoreEntity } from '../core/core.entity'
import * as bcrypt from 'bcryptjs'
import { GENDER_ENUM } from '../enums/gender.enum'
import { ROLE_ENUM } from '../enums/role.enum'
import { Exclude } from 'class-transformer'

@Entity()
export class User extends CoreEntity {
  /* -----------------------mandatory----------------------- */
  @Column({ nullable: true })
  first_name: string

  @Column({ nullable: true })
  last_name: string

  /* ----------------------optional------------------------- */

  // @Column()
  // @IsDate()
  // @MaxDate(new Date('2020-12-31'))
  // dob: Date

  @Column()
  @MinLength(1)
  username: string

  @Column()
  @MinLength(7)
  password: string

  // Used when create new or update password
  newPassword: string

  @Column({ type: 'enum', enum: ROLE_ENUM, default: ROLE_ENUM.USER })
  role: ROLE_ENUM

  @Column({ unique: true })
  email: string

  @Column()
  phone_number: string

  @Column({ default: false })
  receiveInfoAndPolicy: boolean

  @Column({ default: false })
  verified: boolean

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    console.log(this.newPassword)
    if (!this.newPassword) return
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.newPassword, salt)
    this.newPassword = null
    console.log(this.newPassword)
  }
}
