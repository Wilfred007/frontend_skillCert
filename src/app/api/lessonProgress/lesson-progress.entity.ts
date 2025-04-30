// src/api/LessonProgress/lesson-progress.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { User } from '../User/user.entity';
// import { Lesson } from '../Lesson/lesson.entity';

@Entity()
export class LessonProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.lessonProgresses)
  user: User;

  @ManyToOne(() => Lesson, lesson => lesson.progresses)
  lesson: Lesson;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ type: 'float', default: 0 })
  progressPercentage: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastAccessed: Date;

  @Column({ type: 'json', nullable: true })
  completedSteps: number[]; // Array of completed step IDs
}