import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstructorStudentEntity } from 'src/instructor/entities/instructorStudent.entity';
import { InstructorStudentRepository } from 'src/instructor/repository/instructorStudent.repository';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(InstructorStudentRepository)
    private readonly instructorStudentRepository: InstructorStudentRepository,
  ) {}

  public async getDetails(studentUserId: number): Promise<InstructorStudentEntity> {
    try {
      return await this.instructorStudentRepository
        .createQueryBuilder('instructor_students')
        .leftJoinAndSelect('instructor_students.instructor', 'instructor')
        .where('instructor_students.student_id = :studentUserId', { studentUserId })
        .getOneOrFail();
    } catch (error) {
      throw error;
    }
  }
}
