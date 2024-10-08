import { Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtPayload } from '../auth/@types/jwt-payload.type';

@ApiBearerAuth()
@Controller('blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.blocksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.blocksService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/take')
  takeBlock(@Param('id') id: number, @Req() req: Request) {
    const { userId } = req.user as JwtPayload;

    return this.blocksService.takeBlock(id, userId);
  }
}
