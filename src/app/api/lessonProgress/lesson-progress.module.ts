// src/api/LessonProgress/lesson-progress.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonProgressController } from './lesson-progress.controller';
import { LessonProgressService } from './lesson-progress.service';
import { LessonProgressRepository } from './lesson-progress.repository';
import { UserModule } from '../User/user.module';
import { LessonModule } from '../Lesson/lesson.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LessonProgressRepository]),
    UserModule,
    LessonModule,
  ],
  controllers: [LessonProgressController],
  providers: [LessonProgressService],
  exports: [LessonProgressService],
})
export class LessonProgressModule {}