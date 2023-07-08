import { BadRequestException, Body, Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { AppDS } from "src/config/data.source";
import { RoutineCreateDTO } from "src/routines/dto/routine.create.dto";
import { ErrorManager } from "src/utils/error.manager";

@Injectable()
export class IsStudentsCodePipe implements PipeTransform {
   async transform(body: RoutineCreateDTO) {
    // Realiza la validación
    if(body.students){
      
      const result =  await AppDS.manager.query(`
      SELECT id FROM users WHERE role = 'STUDENT' AND id = ALL (ARRAY[${body.students}]);`)
      if (!result || result.length === 0) {
        throw new ErrorManager({ type: 'BAD_REQUEST', message: 'Verifique que todos los estudiantes,tengan rol estudiantes' });
      }
      throw new ErrorManager({ type: 'BAD_REQUEST', message: 'hay students' });
    }
    throw new ErrorManager({ type: 'BAD_REQUEST', message: 'no hay students' });
  
   
    return body;
  }
  
}