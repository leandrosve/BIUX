import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { UserUpdateDTO } from './dto/user.update.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { IResponse } from 'src/utils/responseAPI';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>
    ){}

    public async createdUser(body:UserDTO):Promise<IResponse<UsersEntity[]>>{
      try {

        const user= await this.userRepository.save(body);
        if(user){
          return {
            statusCode:201,
            message:'se creo el usuario correctamente',
            data:[user]
          } as IResponse<UsersEntity[]>
        }

        throw new ErrorManager({
          type:'BAD_REQUEST',
          message: 'No se pudo crear el usuario'
        })
      } catch (error) {
        throw ErrorManager.createSignatureError(error.message);
      }
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
        } as IResponse<UsersEntity[]>
      } catch (error) {
        throw new Error(error)
      }
    }

    public async findUsersBy(id:string):Promise<IResponse<UsersEntity[]>>{
      try {
        const user: UsersEntity = await this.userRepository
          .createQueryBuilder('user')
          .where({ id })
          .getOne();
        if (!user) {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: 'No se encontro resultado',
          });
        }
        return  {
          statusCode:200,
          message:'Se encontro el usuario',
          data:[user]
        } as IResponse<UsersEntity[]>
      } catch (error) {
        throw ErrorManager.createSignatureError(error.message);
      }
    }

    public async updateUser(body:UserUpdateDTO,id:string):Promise<IResponse<UsersEntity[]>>{
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
        } as IResponse<UsersEntity[]>
      } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
      }
    }

    public async deleteUser(id:string):Promise<DeleteResult | undefined>{
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

}
