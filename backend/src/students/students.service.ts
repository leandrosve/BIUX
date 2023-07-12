import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstructorStudentEntity } from 'src/instructor/entities/instructorStudent.entity';
import { RoutineInstructorStudentEntity } from 'src/instructor/entities/routines-instructor-students.entity';
import { InstructorStudentRepository } from 'src/instructor/repository/instructorStudent.repository';
import { Repository } from 'typeorm';
import { AppDS } from "src/config/data.source";
import { RoutineRepository } from 'src/routines/routines.repository';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(InstructorStudentRepository)
    private readonly instructorStudentRepository: InstructorStudentRepository,

    @InjectRepository(RoutineRepository)
    private readonly routineRepository: RoutineRepository,

    @InjectRepository(RoutineInstructorStudentEntity)
    private readonly routineInstructorStudentRepository: Repository<RoutineInstructorStudentEntity>,
  ) {}

  public async getDetails(studentUserId: number): Promise<any> {
    try {
      return await this.instructorStudentRepository
      .createQueryBuilder('instructorStudent')
      .leftJoinAndSelect('instructorStudent.instructor', 'instructor')
      .where('instructorStudent.student.id = :studentUserId', { studentUserId })
      .getOne();;
    } catch (error) {
      throw error;
    }
  }

  public async getRoutinesV2(studentUserId: number): Promise<any> {
    try {
      return await this.routineRepository.getReducedRoutinesForStudent(studentUserId);
    } catch (error) {
      throw error;
    }
  }

  public async getRoutines(studentUserId: number): Promise<any> {
    try {
      const query = `
      SELECT r.*
      FROM public.routines_instructors_students ris
      LEFT JOIN routines r ON ris.routine_id = r.id
      WHERE ris.student_id = ${studentUserId}
    `;
    const result =  await AppDS.manager.query(query)
    return result
    console.log(result)
      const rutinasDelEstudiante= await this.routineInstructorStudentRepository.find({
        where: {
          student: {
            id: studentUserId,
          },
        },
        relations: ['routine'],
      });
  
      return rutinasDelEstudiante.map((routineInstructorStudent) => routineInstructorStudent.routine);;
    } catch (error) {
      throw error;
    }
  }

  public async getRoutineDetails(studentUserId: number, routineId: number): Promise<any> {
    try {
      return await this.routineRepository.getFullRoutineForStudent(studentUserId, routineId);
    } catch (error) {
      throw error;
    }
  }
  
}
