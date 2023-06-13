import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/entities/users.entity';
import { ErrorManager } from 'src/utils/error.manager';
import { IResponse } from 'src/utils/responseAPI';
import { Repository } from 'typeorm';
import { RegisterUserDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';



@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
       ){}
  login(){
    return 'login from service'
  }



  public async register(body:RegisterUserDTO):Promise<IResponse<UsersEntity[]>>{
    try {
      body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      const user= await this.userRepository.save(body);
      if(user){
        return {
          statusCode: 201,
          message: 'Se creó el usuario correctamente',
        };
      }

      throw new ErrorManager({
        type:'BAD_REQUEST',
        message: 'No se pudo crear el usuario'
      })
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

}
