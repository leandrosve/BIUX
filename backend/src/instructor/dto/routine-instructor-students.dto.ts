import { IsInt } from "class-validator";


export class RoutineInstructorStudentDTO{

  @IsInt()
  routine: number;

  @IsInt()
  student: number;

  @IsInt()
  instructor: number;
}