import { BadRequestException, Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { RegisterUserDTO } from "../dto/register.dto";
import { ROLES } from "src/constants/roles";
import { AppDS } from "src/config/data.source";

@Injectable()
export class StudentCodePipe implements PipeTransform {
   async transform(body: RegisterUserDTO) {
    // Realiza la validación
    if (body.role === ROLES.STUDENT) {
      if (!body.code) {
        throw new BadRequestException('Se requiere el campo code, el estudiante necesita el código de acceso');
      }
    
      const result =  await AppDS.manager.query(`SELECT id FROM instructor_code where code='${body.code}' ;`)
      if (!result || result.length === 0) {
        throw new NotFoundException('El código de acceso es incorrecto, contacte con el profesor a cargo');
      }
    }

    if (body.role === ROLES.INSTRUCTOR) {
      if (body.code) {
        throw new BadRequestException('No se requiere el campo code, para el INSTRUCTOR');
      }
  
    }
   
    return body;
  }
  
}