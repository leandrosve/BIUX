import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserUpdateDTO } from './dto/user.update.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { IResponse } from 'src/utils/responseAPI';
import { RoutineAssignmentEntity } from './entities/RoutineAssignmentEntity.entity';
import { StudentIntoRoutineDTO } from './dto/studentIntoRoutine.dto';
import { RegisterUserDTO } from 'src/auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(RoutineAssignmentEntity)
    private readonly routineAssigEntity: Repository<RoutineAssignmentEntity>
    ){

    }


    public async findUsers():Promise<IResponse<UsersEntity[]>>{
      try {
        const result=await this.userRepository
        .find({
          order: {
            createdAt: 'ASC',
          },
        });

        return {
          statusCode:200,
          message:'Listado de usuarios',
          data:result
        } 
      } catch (error) {
        throw new Error(error)
      }
    }

    public async findUserById(id:number):Promise<UsersEntity>{
      try {
        const user: UsersEntity = await this.userRepository
          .createQueryBuilder('user')
          .where({ id })
          .leftJoinAndSelect('user.routines_created','routines_created')
          .getOne();
        if (!user) {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: 'No se encontro resultado',
          });
        }
        return  user 
      } catch (error) {
        throw ErrorManager.createSignatureError(error.message);
      }
    }

    public async updateUser(body:UserUpdateDTO,id:number):Promise<IResponse<void>>{
      try {
        const user:UpdateResult=await this.userRepository.update(id,body)
        if(user.affected==0){
          throw new ErrorManager({
            type:'BAD_REQUEST',
            message: 'No se pudo realizar la actualizacion'
          })
        }
        return  {
          statusCode:200,
          message:'Se acutualizo el usuario',
        } 
      } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
      }
    }

    public async deleteUser(id:number):Promise<DeleteResult | undefined>{
      try {
        const user:DeleteResult=await this.userRepository.delete(id)
        if(user.affected==0){
          throw new ErrorManager({
            type:'BAD_REQUEST',
            message: 'No se pudo eliminar'
          })        }
        return user
      } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
      }
    }

    async getInstructorRoutines(userId: number) {
      const user = await this.userRepository.findOne({where:{id:userId}, relations: ['routines'] });
      if (user && user.role === 'INSTRUCTOR') {
        return user.routines_created;
      }
      return [];
    }
  
    async getAssignedRoutines(userId: number) {
      const user = await this.userRepository.findOne({where:{id:userId} ,relations: ['routineAssignments', 'routineAssignments.routine'] });
      if (user && user.role === 'STUDENT') {
        return user.routineAssignments.map(assignment => assignment.routine);
      }
      return [];
    }

    public async addStudentIntoRoutine(body:StudentIntoRoutineDTO){

      try {
        return await this.routineAssigEntity.save(body)
      } catch (error) {
        throw ErrorManager.createSignatureError(error.message);

      }
    }
    public async findByEmail(email: string) {
      return await this.userRepository.findOne({ where:{email:email} });
    }

    public async findBy({ key, value }: { key: keyof RegisterUserDTO; value: any }) {
      try {
        const user: UsersEntity = await this.userRepository
          .createQueryBuilder('user')
          .addSelect('user.password')
          .where({ [key]: value })
          .getOne();
  
        return user;
      } catch (error) {
        throw ErrorManager.createSignatureError(error.message);
      }
    }
  

}
