import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RoutineInstructorStudentEntity } from '../entities/routines-instructor-students.entity';

@Injectable()
export class RoutineInstructorStudentRepository extends Repository<RoutineInstructorStudentEntity> {
  constructor(private dataSource: DataSource) {
    super(RoutineInstructorStudentEntity, dataSource.createEntityManager());
  }

  async getStudentsByRoutineId(instructorId: number, routineId: number) {
    const res = await this.createQueryBuilder('routines_instructors_students')
      .leftJoinAndSelect('routines_instructors_students.student', 'student')
      .where('routines_instructors_students.instructor_id = :instructorId and routines_instructors_students.routine_id = :routineId ', {
        instructorId,
        routineId,
      })
      .getMany();
    return res.map((instructorStudent) => instructorStudent.student);
  }
  async createRoutineInstructorStudent(routineId: number, instructorId: number, studentId: number): Promise<RoutineInstructorStudentEntity> {
    const routineInstructorStudent = await this.create({
      routine: { id: routineId },
      instructor: { id: instructorId },
      student: { id: studentId },
    });

    return await this.save(routineInstructorStudent);
  }

}
