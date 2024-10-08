import { Module } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { BlocksController } from './blocks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Block } from './entities/block.entity';
import { Chapter } from '../chapters/entities/chapter.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Block, Chapter, User])],
  controllers: [BlocksController],
  providers: [BlocksService],
})
export class BlocksModule {}
