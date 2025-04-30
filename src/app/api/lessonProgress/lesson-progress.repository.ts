// src/api/LessonProgress/lesson-progress.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { LessonProgress } from './lesson-progress.entity';

@EntityRepository(LessonProgress)
export class LessonProgressRepository extends Repository<LessonProgress> {
  async findByUserAndLesson(userId: number, lessonId: number): Promise<LessonProgress | undefined> {
    return this.findOne({ where: { user: userId, lesson: lessonId } });
  }

  async findUserProgress(userId: number): Promise<LessonProgress[]> {
    return this.find({ where: { user: userId }, relations: ['lesson'] });
  }
}