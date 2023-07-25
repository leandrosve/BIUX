import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InstructorStudentEntity } from '../entities/instructorStudent.entity';
import { UserReducedDTO } from 'src/users/dto/user.reducerd.dto';

@Injectable()
export class InstructorStudentRepository extends Repository<InstructorStudentEntity> {
  constructor(private dataSource: DataSource) {
    super(InstructorStudentEntity, dataSource.createEntityManager());
  }
  async getStudentsByInstructorForIds(instructorId: number, studentsIds:number[]): Promise<UserReducedDTO[]> {
    return await this.createQueryBuilder('instructor_students')
    .leftJoin('instructor_students.student', 'student')
    .where('instructor_students.instructor_id = :instructorId', { instructorId })
    .andWhere('student.role = :role', { role: 'STUDENT' })
    .andWhere('instructor_students.student_id = ANY (:studentsIds)', { studentsIds})
    .select(['student.id,student.email, student.role'])
    .getRawMany();
  }
  async getStudents(instructorId:number){
    const res = await this
    .createQueryBuilder('instructor_students')
    .leftJoinAndSelect('instructor_students.student', 'student')
    .where('instructor_students.instructor_id = :instructorId', { instructorId })
    .getMany();
  return res.map((instructorStudent) => instructorStudent.student);
  }


  public async getStudent(instructorId: number, studentId: number): Promise<InstructorStudentEntity> {
    return await this
      .createQueryBuilder('instructor_students')
      .leftJoinAndSelect('instructor_students.student', 'student')
      .leftJoinAndSelect('routines_instructors_students', 'ris', 'ris.student_id = :studentId and ris.instructor_id = :instructorId')
      .leftJoinAndSelect('routines', 'r', 'r.id = ris.routine_id')
      .where('instructor_students.instructor_id = :instructorId and instructor_students.student_id = :studentId', { instructorId, studentId })
      .getOne();
  }

}
