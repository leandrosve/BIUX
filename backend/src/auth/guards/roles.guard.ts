import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { INSTRUCTOR_KEY, PUBLIC_KEY, ROLES_KEY } from 'src/constants/key-decorators';
import { ROLES } from 'src/constants/roles';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(    //acceder a los decoradores
  private readonly reflector: Reflector){ 
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic:Boolean= this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler()
    )
    if(isPublic) return true;
    
    const roles= this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler()
    )

    const instructor = this.reflector.get<string>(INSTRUCTOR_KEY, context.getHandler());


    const req = context.switchToHttp().getRequest<Request>();

    const { roleUser } = req;

    if (roles === undefined) {
      if (!instructor) {
        return true;
      } else if (instructor && roleUser === instructor) {
        return true;
      } else {
        throw new UnauthorizedException(
          'No tienes permisos para esta operacion',
        );
      }
    }

    return true;
  }
}
