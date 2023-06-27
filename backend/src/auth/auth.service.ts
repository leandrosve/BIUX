import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/entities/users.entity';
import { ErrorManager } from 'src/utils/error.manager';
import { IResponse } from 'src/utils/responseAPI';
import { Repository } from 'typeorm';
import { RegisterUserDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import * as jwt from 'jsonwebtoken';
import { AuthResponse, PayloadToken } from 'src/interfaces/auth.interface';
import { SettingsService } from 'src/settings/settings.service';
import { InstructorService } from 'src/instructor/instructor.service';
import { ROLES } from 'src/constants/roles';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    private readonly userService: UsersService,
    private readonly settingService: SettingsService,
    private readonly instructorService: InstructorService
  ) {}


  public async register(body: RegisterUserDTO): Promise<IResponse<any>> {
    try {
      body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      let  userNew:UsersEntity|null=null;
      if(body.role==ROLES.STUDENT && body.code){
        const objectCode=await this.instructorService.findByCode(body.code)
        if(!objectCode.user){
          throw new ErrorManager({
            type:'BAD_REQUEST',
            message: 'No se pudo crear el estudiante'
          })
        }
        userNew = await this.userRepository.save(body);
        await this.settingService.created(userNew);
        const {user:instructor}=objectCode
        await this.instructorService.createdrelationshipWithStudent(userNew,instructor)


      }
      if(body.role==ROLES.INSTRUCTOR){
        userNew = await this.userRepository.save(body);
        await this.settingService.created(userNew);
        await this.instructorService.regenerateCode(userNew.id);
      }

      if(userNew){
          return {
          statusCode: 201,
          message: 'se creo el usuario correctamente'};
      }
      
      throw new ErrorManager({
        type:'BAD_REQUEST',
        message: 'No se pudo crear el usuario'
      })

    } catch (error) {
      throw error;
    }
  }

  public async validateUser(email: string, password: string) {
    const userByEmial = await this.userService.findBy({
      key: 'email',
      value: email,
    });

    if (userByEmial) {
      const match = await bcrypt.compare(password, userByEmial.password);
      if (match) return userByEmial;
    }

    return null;
  }

  public signJWT({ payload, secret, expires }: { payload: jwt.JwtPayload; secret: string; expires: number | string }): string {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  public async generateJWT(user: UsersEntity): Promise<AuthResponse> {
    const getUser = await this.userService.findUserById(user.id);

    const payload: PayloadToken = {
      role: getUser.role,
      sub: getUser.id,
    };

    return {
      accessToken: this.signJWT({
        payload: { ...payload, sub: String(payload.sub) },
        secret: process.env.JWT_SECRET,
        expires: '4h',
      }),
      user,
    };
  }
}
