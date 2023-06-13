import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { UsersService } from '../users.service';
import { EntityManager } from 'typeorm';
import { AppDS } from 'src/config/data.source';

/**
 * Custom validation constraint for email uniqueness
 */
@ValidatorConstraint({ name: 'isEmailUnique', async: true })
@Injectable()
export class IsEmailUnique {
  constructor() {}

  public async validate(email: string): Promise<boolean> {
    const result:any[]=await AppDS.manager.query(`SELECT id
    FROM users where email='${email}' ;`)
    return (result.length==0);
  }

  /**
   * Default error message
   */
  public defaultMessage(args: ValidationArguments): string {
    return 'User with this email already exists.';
  }
}
