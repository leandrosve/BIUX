import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { Request } from 'express';

import { AppDS } from 'src/config/data.source';

/**
 * Custom validation constraint for email uniqueness
 */
@ValidatorConstraint({ name: 'isStudents', async: true })
@Injectable()
export class IsStudents{
  constructor(@Inject(REQUEST) private request: Request) {}

  public async validate(stuentsIds:number[]): Promise<boolean> {
   console.log('students ',stuentsIds,'de instructor:', this.request)
    return (false);
  }

 
  public defaultMessage(args: ValidationArguments): string {
    return 'verifique que todos los Ids de los alumnos, sean estudiantes, pertenecientes a ese instructor';
  }
}


