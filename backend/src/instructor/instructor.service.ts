import { Injectable } from '@nestjs/common';
import { InstructorCodeEntity } from './entities/instructorCode.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { UsersEntity } from 'src/users/entities/users.entity';
import { InstructorStudentEntity } from './entities/InstructorStudent.entity';
import { InstructorStudentDTO } from './dto/instructorStudent.dto';
import { RoutinesService } from 'src/routines/routines.service';
import { RoutineUpdateDTO } from 'src/routines/dto/routine.update.dto';
import { RoutineCreateDTO } from 'src/routines/dto/routine.create.dto';

@Injectable()
export class InstructorService {
  constructor(
    @InjectRepository(InstructorCodeEntity)
    private readonly instructorCodeRepository: Repository<InstructorCodeEntity>,
    @InjectRepository(InstructorStudentEntity)
    private readonly instructorStudentRepository: Repository<InstructorStudentEntity>,
    private readonly routinesService: RoutinesService
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
    return await this.routinesService.createdRoutine(instructorId, body);
  }
  public async routines(instructorId: number) {
    return await this.routinesService.routinesByInstructor(instructorId);
  }

  public async routineDetails(instructorId: number, routineId: number) {
    return await this.routinesService.details(instructorId, routineId);
  }
  public async getStudents(instructorId: number) {
    const res =  await this.instructorStudentRepository
      .createQueryBuilder('instructor_students')
      .leftJoinAndSelect('instructor_students.student', 'student')
      .where('instructor_students.instructor_id = :instructorId', { instructorId })
      .getMany(); 
    return res.map(instructorStudent => instructorStudent.student);
  }
}
