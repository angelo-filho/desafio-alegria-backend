import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Repository } from 'typeorm';
import { Chapter } from './entities/chapter.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectRepository(Chapter)
    private chaptersRepository: Repository<Chapter>,
  ) {}

  create(createChapterDto: CreateChapterDto) {
    return 'This action adds a new chapter';
  }

  findAll() {
    return `This action returns all chapters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chapter`;
  }

  update(id: number, updateChapterDto: UpdateChapterDto) {
    return `This action updates a #${id} chapter`;
  }

  remove(id: number) {
    return `This action removes a #${id} chapter`;
  }

  async toggleChapter(id: number, userId: string) {
    const chapter = await this.chaptersRepository.findOne({
      where: {
        id,
      },
      relations: {
        block: {
          user: true,
        },
      },
    });

    if (!chapter) {
      return new NotFoundException('Capítulo não encontrado');
    }

    if (!chapter.block.user) {
      return new BadRequestException(
        'Não é possível completar um capítulo sem dono',
      );
    }

    if (chapter.block.user.id !== userId) {
      return new UnauthorizedException('Você não é dono desse bloco');
    }

    const updatedChapter = await this.chaptersRepository.save({
      ...chapter,
      completed: !chapter.completed,
    });

    return updatedChapter;
  }
}
