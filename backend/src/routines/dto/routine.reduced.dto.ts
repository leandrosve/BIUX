import { RoutineInstructorStudentEntity } from 'src/instructor/entities/routines-instructor-students.entity';
import { IRoutine } from 'src/interfaces/routine.interface';
import { SegmentsEntity } from 'src/segments/entities/segments.entity';

export class RoutineReducedDTO {
  name: string;
  description: string;
  id: number;
  totalDuration: number;
}

export class RoutineReducedFullDTO {
  name: string;
  description: string;
  id: number;
  totalDuration: number;
  segments: SegmentsEntity[]
  routineInstructorStudents: RoutineInstructorStudentEntity[]
}
