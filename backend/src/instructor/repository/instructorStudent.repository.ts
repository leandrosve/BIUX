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
}
