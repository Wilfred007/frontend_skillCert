// src/api/LessonProgress/lesson-progress.controller.ts
import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { LessonProgressService } from './lesson-progress.service';
import { LessonProgress } from './lesson-progress.entity';
import { CreateLessonProgressDto, UpdateLessonProgressDto } from './lesson-progress.dto';

@Controller('lesson-progress')
export class LessonProgressController {
  constructor(private readonly lessonProgressService: LessonProgressService) {}

  @Get('user/:userId')
  async getUserProgress(@Param('userId') userId: number): Promise<LessonProgress[]> {
    return this.lessonProgressService.getUserProgress(userId);
  }

  @Get('user/:userId/lesson/:lessonId')
  async getLessonProgress(
    @Param('userId') userId: number,
    @Param('lessonId') lessonId: number,
  ): Promise<LessonProgress> {
    return this.lessonProgressService.getOrCreateProgress(userId, lessonId);
  }

  @Post()
  async createProgress(@Body() createDto: CreateLessonProgressDto): Promise<LessonProgress> {
    return this.lessonProgressService.createProgress(createDto.userId, createDto.lessonId);
  }

  @Put('user/:userId/lesson/:lessonId')
  async updateProgress(
    @Param('userId') userId: number,
    @Param('lessonId') lessonId: number,
    @Body() updateDto: UpdateLessonProgressDto,
  ): Promise<LessonProgress> {
    return this.lessonProgressService.updateProgress(userId, lessonId, updateDto);
  }
}