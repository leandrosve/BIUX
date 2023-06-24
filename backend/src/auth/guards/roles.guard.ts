import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { INSTRUCTOR_KEY, PUBLIC_KEY, ROLES_KEY, STUDENT_KEY } from 'src/constants/key-decorators';
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
    
    //viene desde el decorrador
    const roles= this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler()
    )
    //const instructor = this.reflector.get<string>(INSTRUCTOR_KEY, context.getHandler());


    const req = context.switchToHttp().getRequest<Request>();
    const { roleUser } = req;
    console.log('roles user login', roleUser,"roles en el decorador",roles,roles.some(a=> a==roleUser))

    if(roles.some(a=> a==roleUser)){
      return true
    }


    throw new UnauthorizedException(
        `No tienes el rol requerido: ${roles}`
       ); 

    // if (roles === undefined) {
    //   if (!instructor) {
    //     return true;
    //   } else if (instructor && roleUser === instructor) {
    //     return true;
    //   } else {
    //     throw new UnauthorizedException(
    //       'No tienes permisos para esta operacion',
    //     );
    //   }
    // }

    return true;
  }
}
