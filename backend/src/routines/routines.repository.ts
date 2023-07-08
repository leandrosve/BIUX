import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RoutinesEntity } from './entities/routines.entity';
import { RoutineReducedDTO, RoutineReducedFullDTO } from './dto/routine.reduced.dto';

@Injectable()
export class RoutineRepository extends Repository<RoutinesEntity> {
  constructor(private dataSource: DataSource) {
    super(RoutinesEntity, dataSource.createEntityManager());
  }

  async getReducedRoutinesForInstructor(instructorId: number): Promise<RoutineReducedDTO[]> {
    return await this
      .createQueryBuilder('routines')
      .where('routines.instructor_id = :instructorId', { instructorId })
      .leftJoin('routines.segments', 'segments')
      .select('routines.id,routines.name, routines.description,SUM(segments.duration)', 'totalDuration')
      .groupBy('routines.id')
      .orderBy('routines.createdAt', 'DESC')
      .getRawMany();
  }

  async getFullRoutine(instructorId:number,routineId:number):Promise<RoutineReducedFullDTO>{
    const result= await this
    .createQueryBuilder('routines')
    .where('routines.id = :routineId and routines.instructor_id = :instructorId', { routineId, instructorId })
    .leftJoinAndSelect('routines.segments', 'segments')
    .leftJoinAndSelect('routines.routineInstructorStudents', 'routines_instructors_students')
    .leftJoinAndSelect('routines_instructors_students.student', 'student')
    .addSelect('SUM(segments.duration)', 'totalDuration')
    .groupBy('routines.id, segments.id, routines_instructors_students.id,student.id')
    .getOne();
    let totalDuration = result.segments.length==0 ? 0:  result.segments.reduce((accumulator, currentValue) => accumulator + currentValue.duration, 0);
    return{
      ...result,totalDuration
    }
  }
}
