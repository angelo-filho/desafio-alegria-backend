import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Block } from './entities/block.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';

@ApiBearerAuth()
@Injectable()
export class BlocksService {
  constructor(
    @InjectRepository(Block)
    private blockRepository: Repository<Block>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async findAll() {
    const blocks = await this.blockRepository.find({
      relations: {
        chapters: true,
        user: true,
      },
      order: {
        chapters: {
          id: 'asc',
        },
      },
    });

    const blocksWithCompleted = blocks.map((block) => ({
      ...block,
      completed:
        block.chapters.filter((chapter) => chapter.completed).length === 5,
    }));

    return blocksWithCompleted;
  }

  async findOne(id: number) {
    return this.blockRepository.findOneBy({
      id,
    });
  }

  async takeBlock(id: number, userId: string) {
    const block = await this.blockRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });

    if (!block) return new NotFoundException('Bloco não encontrado');

    if (block.user && block.user.id !== userId)
      return new BadRequestException('Bloco já tem dono');

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        blocks: true,
      },
    });

    if (user?.blocks?.length > 1) {
      return new BadRequestException('Você tem dois ou mais blocos');
    }

    return this.blockRepository.save({ ...block, user });
  }
}
