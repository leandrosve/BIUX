import { Injectable } from '@nestjs/common';
import { InstructorCodeEntity } from './entities/instructorCode.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { UsersEntity } from 'src/users/entities/users.entity';
import { InstructorStudentEntity } from './entities/InstructorStudent.entity';
import { InstructorStudentDTO } from './dto/instructorStudent.dto';

@Injectable()
export class InstructorService {
  constructor(
    @InjectRepository(InstructorCodeEntity)
    private readonly instructorCodeRepository: Repository<InstructorCodeEntity>,
    @InjectRepository(InstructorStudentEntity)
    private readonly instructorStudentRepository: Repository<InstructorStudentEntity>,
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

  public async regenerateCode(user_id: number) {
    try {
      const currentCode = await this.code(user_id);

      let newCode:string;
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

  public async findByCode(code:string):Promise<InstructorCodeEntity>{
    const objectInstructorCode = await this.instructorCodeRepository.findOne({
      where: { code },
      relations: ['user'], // Indica que quieres cargar la relación con la entidad 'user'
    });

    return objectInstructorCode
  }

  public async createdrelationshipWithStudent(student:UsersEntity,instructor:UsersEntity ){
   const body:InstructorStudentDTO={
      instructor:instructor ,
      student: student,
    }
    return await this.instructorStudentRepository.save(body);
  }
}
