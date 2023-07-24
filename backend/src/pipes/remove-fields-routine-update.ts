import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class RemoveFieldsRoutineUpdatePipe implements PipeTransform {
  private readonly fieldsToRemove: string[] = ['id', 'createdAt', 'updatedAt', 'totalDuration'];

  transform(value: any, metadata: ArgumentMetadata): any {
    if (!value || typeof value !== 'object') {
      return value;
    }

    // Elimina los atributos del cuerpo especificados
    this.fieldsToRemove.forEach(field => {
      if (value.hasOwnProperty(field)) {
        delete value[field];
      }
    });

    const updatedData = {
      ...value,
      segments: value['segments'].map(({ localId, ...rest }) => rest)
    };


    return updatedData;
  }
}
