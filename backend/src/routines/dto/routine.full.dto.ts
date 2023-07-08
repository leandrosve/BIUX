import { IRoutine } from "src/interfaces/routine.interface";
import { SegmentsEntity } from "src/segments/entities/segments.entity";
import { UsersEntity } from "src/users/entities/users.entity";

export class RoutineGetFullDTO {
  id:number
  name: string;
  description: string;
  totalDuration: number;

  segments: SegmentsEntity[]

  students: UsersEntity[];
  

} 