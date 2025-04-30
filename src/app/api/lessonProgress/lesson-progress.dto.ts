// src/api/LessonProgress/lesson-progress.dto.ts
export class CreateLessonProgressDto {
    userId: number;
    lessonId: number;
  }
  
  export class UpdateLessonProgressDto {
    isCompleted?: boolean;
    progressPercentage?: number;
    completedSteps?: number[];
  }