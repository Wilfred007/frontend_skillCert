// src/api/LessonProgress/lesson-progress.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonProgressRepository } from './lesson-progress.repository';
import { LessonProgress } from './lesson-progress.entity';
import { CreateLessonProgressDto, UpdateLessonProgressDto } from './lesson-progress.dto';

@Injectable()
export class LessonProgressService {
  constructor(
    @InjectRepository(LessonProgressRepository)
    private readonly lessonProgressRepository: LessonProgressRepository,
  ) {}

  async getOrCreateProgress(userId: number, lessonId: number): Promise<LessonProgress> {
    let progress = await this.lessonProgressRepository.findByUserAndLesson(userId, lessonId);
    
    if (!progress) {
      progress = await this.createProgress(userId, lessonId);
    }

    return progress;
  }

  async createProgress(userId: number, lessonId: number): Promise<LessonProgress> {
    const progress = this.lessonProgressRepository.create({
      user: { id: userId },
      lesson: { id: lessonId },
    });
    return this.lessonProgressRepository.save(progress);
  }

  async updateProgress(
    userId: number,
    lessonId: number,
    updateData: UpdateLessonProgressDto,
  ): Promise<LessonProgress> {
    const progress = await this.getOrCreateProgress(userId, lessonId);
    
    if (updateData.isCompleted !== undefined) {
      progress.isCompleted = updateData.isCompleted;
    }
    
    if (updateData.progressPercentage !== undefined) {
      progress.progressPercentage = updateData.progressPercentage;
    }
    
    if (updateData.completedSteps !== undefined) {
      progress.completedSteps = updateData.completedSteps;
    }

    progress.lastAccessed = new Date();
    
    return this.lessonProgressRepository.save(progress);
  }

  async getUserProgress(userId: number): Promise<LessonProgress[]> {
    return this.lessonProgressRepository.findUserProgress(userId);
  }
}