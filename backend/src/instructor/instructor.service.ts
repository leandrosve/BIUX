import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoutineCreateDTO } from 'src/routines/dto/routine.create.dto';
import { RoutineUpdateDTO } from 'src/routines/dto/routine.update.dto';
import { RoutinesService } from 'src/routines/routines.service';
import { UserReducedDTO } from 'src/users/dto/user.reducerd.dto';
import { UsersEntity } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { ErrorManager } from 'src/utils/error.manager';
import { Repository } from 'typeorm';
import { InstructorStudentDTO } from './dto/instructorStudent.dto';
import { InstructorCodeEntity } from './entities/instructorCode.entity';
import { RoutineInstructorStudentEntity } from './entities/routines-instructor-students.entity';
import { InstructorStudentRepository } from './repository/instructorStudent.repository';
import { RoutineRepository } from 'src/routines/routines.repository';
import InstructorStudentFullDTO from './dto/instructor-student-full.dto';
import routineMockups from 'src/mockups/routine.mockups';
import { RoutineReducedDTO } from 'src/routines/dto/routine.reduced.dto';

@Injectable()
export class InstructorService {
  constructor(
    @InjectRepository(InstructorCodeEntity)
    private readonly instructorCodeRepository: Repository<InstructorCodeEntity>,

    private readonly instructorStudentRepository: InstructorStudentRepository,
    private readonly routinesService: RoutinesService,
    @InjectRepository(RoutineInstructorStudentEntity)
    private readonly routineInstructorStudentRepository: Repository<RoutineInstructorStudentEntity>
  ) {}

  public async code(user_id: number): Promise<InstructorCodeEntity> {
    try {
      const instructor_code = await this.instructorCodeRepository
        .createQueryBuilder('instructor_code')
        .where('instructor_code.user_id = :user_id', { user_id })
        .getOne();

      return instructor_code;
    } catch (error) {
      throw error;
    }
  }

  public async checkCode(code: string): Promise<{ valid: boolean; user: UsersEntity }> {
    try {
      const instructorCode = await this.instructorCodeRepository
        .createQueryBuilder('instructor_code')
        .innerJoinAndSelect('instructor_code.user', 'u')
        .where('instructor_code.code = :code', { code })
        .getOne();

      if (!instructorCode) {
        throw new ErrorManager({ type: 'BAD_REQUEST', message: 'invalid_code' });
      }
      return {
        valid: true,
        user: instructorCode.user,
      };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async regenerateCode(user_id: number) {
    try {
      const currentCode = await this.code(user_id);

      let newCode: string;
      for (let i = 0, codeExists = true; i < 10; i++) {
        newCode = this.generateInstructorCode();
        codeExists = Boolean(await this.instructorCodeRepository.findOne({ where: { code: newCode } }));
        if (!codeExists) break;
      }

      if (!currentCode) {
        const instructorCode = new InstructorCodeEntity();
        const user = new UsersEntity();
        user.id = user_id;
        instructorCode.user = user;
        instructorCode.code = newCode;
        let result = await this.instructorCodeRepository.save(instructorCode);
        const { id, code, createdAt, updatedAt } = result;
        return { id, code, createdAt, updatedAt };
      }

      const updatedCode = await this.instructorCodeRepository.save({ id: currentCode.id, code: newCode });
      return updatedCode;
    } catch (error) {
      throw error;
    }
  }

  private generateInstructorCode() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    const length = 6;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  public async findByCode(code: string): Promise<InstructorCodeEntity> {
    const objectInstructorCode = await this.instructorCodeRepository.findOne({
      where: { code },
      relations: ['user'], // Indica que quieres cargar la relación con la entidad 'user'
    });

    return objectInstructorCode;
  }

  public async createdrelationshipWithStudent(student: UsersEntity, instructor: UsersEntity) {
    const body: InstructorStudentDTO = {
      instructor: instructor,
      student: student,
    };
    return await this.instructorStudentRepository.save(body);
  }
  public async updateRoutine(userId: number, routineId, body: RoutineUpdateDTO) {
    return await this.routinesService.update(userId, routineId, body);
  }
  public async createRoutine(instructorId: number, body: RoutineCreateDTO) {
    //return this.routinesService.details(request.idUser,id_routine)
    let resultStudents: UserReducedDTO[] = [];
    if (body.students) {
      resultStudents = await this.instructorStudentRepository.getStudentsByInstructorForIds(instructorId, body.students);
      if (resultStudents.length != body.students.length) {
        throw new ErrorManager({ type: 'BAD_REQUEST', message: 'Puede ser que los alumnos no pertenezcan al instructor' });
      }
    }
    const newRoutine = await this.routinesService.createdRoutine(instructorId, body);
    if (resultStudents.length > 0) {
      const routineInstructorStudents: RoutineInstructorStudentEntity[] = resultStudents.map((student) => {
        let studentObj = new UsersEntity();
        studentObj.id = student.id;
        let instructorObj = new UsersEntity();
        instructorObj.id = instructorId;
        const entity = new RoutineInstructorStudentEntity();
        entity.instructor = instructorObj;
        entity.routine = newRoutine;
        entity.student = studentObj;
        return entity;
      });
      await this.routineInstructorStudentRepository.save(routineInstructorStudents);
    }
    return newRoutine;
  }
  public async routines(instructorId: number) {
    return await this.routinesService.routinesByInstructor(instructorId);
  }

  public async routineDetails(instructorId: number, routineId: number) {
    return await this.routinesService.getFullRoutine(instructorId, routineId);
  }
  public async getStudents(instructorId: number) {
    return await this.instructorStudentRepository.getStudents(instructorId);
  }

  public async getStudentDetail(instructorId: number, studentId: number): Promise<InstructorStudentFullDTO> {
    const student = await this.instructorStudentRepository.getStudent(instructorId, studentId);
    if (!student) throw new ErrorManager({ type: 'NOT_FOUND', message: 'student_not_found' });
    const routines = await this.routinesService.getReducedRoutinesForStudent(studentId);
    const user = student.student;
    return {
      ...user,
      routines,
    };
  }

  public async updateStudentRoutines(instructorId: number, studentId: number, routineIds: number[]): Promise<RoutineReducedDTO[]> {
    const student = await this.instructorStudentRepository.getStudent(instructorId, studentId);
    if (!student) throw new ErrorManager({ type: 'NOT_FOUND', message: 'student_not_found' });
    await this.routinesService.updateRoutinesForStudent(instructorId, studentId, routineIds);
    return await this.routinesService.getReducedRoutinesForStudent(studentId);
  }

  public async createMockedRoutines(instructorId: number) {
    const students = await this.getStudents(instructorId);
    const studentIds = students.map((s) => s.id);
    for (let i = 0; i < routineMockups.length; i++) {
      const routine = routineMockups[i];
      const [start, end] = i > 1 ? [2, 4] : [0, 2];
      const dto: RoutineCreateDTO = {
        ...routine,
        students: studentIds.slice(start, end),
      };
      await this.createRoutine(instructorId, dto);
    }
  }
}
