import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RoutinesEntity } from './entities/routines.entity';
import { RoutineReducedDTO } from './dto/routine.reduced.dto';

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
}
