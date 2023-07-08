import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UsersEntity } from './entities/users.entity';
import { UserReducedDTO } from './dto/user.reducerd.dto';


@Injectable()
export class UsersRepository extends Repository<UsersEntity> {
  constructor(private dataSource: DataSource) {
    super(UsersEntity, dataSource.createEntityManager());
  }


}
