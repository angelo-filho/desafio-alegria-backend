import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { JwtPayload } from '../auth/@types/jwt-payload.type';

@ApiBearerAuth()
@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Post()
  create(@Body() createChapterDto: CreateChapterDto) {
    return this.chaptersService.create(createChapterDto);
  }

  @Get()
  findAll() {
    return this.chaptersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.chaptersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateChapterDto: UpdateChapterDto) {
    return this.chaptersService.update(+id, updateChapterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.chaptersService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/toggle-completed')
  toggleCompleted(@Param('id') id: number, @Req() req: Request) {
    const { userId } = req.user as JwtPayload;

    return this.chaptersService.toggleChapter(id, userId);
  }
}
