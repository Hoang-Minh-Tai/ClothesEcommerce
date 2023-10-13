import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdateInfoDto } from './dto/update-info.dto'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  getOne(id: string) {
    return this.userRepository.findOneByOrFail({ id })
  }

  async update(id: string, updateInfoDto: UpdateInfoDto) {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`)
    }

    Object.assign(user, updateInfoDto)

    return this.userRepository.save(user)
  }
}
