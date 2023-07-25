import { DataSource, IsNull, Not, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RoutineInstructorStudentEntity } from '../entities/routines-instructor-students.entity';

@Injectable()
export class RoutineInstructorStudentRepository extends Repository<RoutineInstructorStudentEntity> {
  constructor(private dataSource: DataSource) {
    super(RoutineInstructorStudentEntity, dataSource.createEntityManager());
  }

  async getStudentsByRoutineId(instructorId: number, routineId: number) {
    const res = await this.createQueryBuilder('ris')
      .leftJoinAndSelect('ris.student', 'student')
      .where('ris.instructor_id = :instructorId and ris.routine_id = :routineId ', {
        instructorId,
        routineId,
      })
      .getMany();
    return res.map((instructorStudent) => instructorStudent.student);
  }
  async createRoutineInstructorStudent(routineId: number, instructorId: number, studentId: number) {
    const record = await this
    .createQueryBuilder('routines_instructors_students') // Alias para la entidad
    .withDeleted()
    .where('routines_instructors_students.routine_id = :routineId', { routineId }) // Filtrar por routineId
    .andWhere('routines_instructors_students.instructor_id = :instructorId', { instructorId }) // Filtrar por instructorId
    .andWhere('routines_instructors_students.student_id = :studentId', { studentId }) // Filtrar por studentId
    .andWhere('routines_instructors_students.deleted_at IS NOT NULL') // Filtrar registros eliminados lógicamente
    .getOne();
   
    if (record) {
      record.deletedAt = null; 
      return await this.update(record.id,record);
    }else{
      const routineInstructorStudent = await this.create({
        routine: { id: routineId },
        instructor: { id: instructorId },
        student: { id: studentId },
      });
      return await this.save(routineInstructorStudent);
    }

  }

  async deleteRoutineInstStudent(routineId:number, instructorId:number,studentId){
    return await this
    .createQueryBuilder()
    .softDelete()
    .where('student_id = :studentId and routine_id = :routineId and instructor_id = :instructorId', { studentId,routineId,instructorId })
    .execute()
  }

}
