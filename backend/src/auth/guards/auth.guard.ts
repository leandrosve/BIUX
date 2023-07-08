import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from 'src/constants/key-decorators';
import { IUseToken } from 'src/interfaces/auth.interface';
import { UsersService } from 'src/users/users.service';
import { useAuthToken } from 'src/utils/useAuthToken';
import { Request } from 'express';

//se ejecuta antes de que llegue a los controladores
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    //acceder a los decoradores
    private readonly reflector: Reflector,
  ) {} 



  async canActivate(
    context: ExecutionContext,
  ){
    const isPublic:Boolean= this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler()
    )
    const request = context.switchToHttp().getRequest();
    const idUserParams = request.params.id; // Obtener el valor del parámetro 'id' del request

    if(isPublic) return true;

    //para leer el header de la funcion
    const req = context.switchToHttp().getRequest<Request>();
    
    const token = req.headers['token'];


    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Invalid token');
    }

    const manageToken: IUseToken | string = useAuthToken(token);

    if (typeof manageToken === 'string') {
      throw new UnauthorizedException(manageToken);
    }

    if (manageToken.isExpired) {
      throw new UnauthorizedException('Token expired');
    }


    const { sub } = manageToken;
    //si el token de la persona es el mismo que se pasa por la url
    if(idUserParams){
      if(sub!=Number(idUserParams)){
        throw new UnauthorizedException('Invalid user');
      }
    }

    const user = await this.userService.findUserById(sub);
    if(!user){
      throw new UnauthorizedException('Invalid user');
    }

    req.idUser = user.id
    req.roleUser = user.role
    return true;
    
  }
}
