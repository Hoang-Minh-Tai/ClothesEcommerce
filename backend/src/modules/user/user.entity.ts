import { IsDate, IsEmail, IsPhoneNumber, maxDate, MaxDate, Min } from 'class-validator'
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm'
import { CoreEntity } from '../core/core.entity'
import * as bcrypt from 'bcryptjs'
import { GENDER_ENUM } from '../enums/gender.enum'

@Entity()
export class User extends CoreEntity {
  @Column()
  first_name: string

  @Column()
  last_name: string

  @Column()
  @IsDate()
  @MaxDate(new Date('2020-12-31'))
  dob: Date

  @Column({ unique: true })
  @IsEmail()
  email: string

  @Column({ unique: true })
  @IsPhoneNumber('VN', { message: 'Invalid phone number format' })
  phone_number: string

  @Column({ enum: GENDER_ENUM, default: GENDER_ENUM.OTHER })
  gender: GENDER_ENUM

  @Column()
  password: string

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (!this.password) return
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
  }
}
