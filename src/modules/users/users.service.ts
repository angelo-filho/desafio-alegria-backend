import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import BcryptUtil from '../auth/utils/bcrypt.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create({ name, password, group }: CreateUserDto) {
    const hashedPassword = await BcryptUtil.encodePassword(password);

    const user = await this.usersRepository.save({
      name,
      group,
      password: hashedPassword,
    });

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: {
        id: true,
        group: true,
        name: true,
      },
      relations: {
        blocks: true,
      },
    });

    if (!user) {
      return new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
