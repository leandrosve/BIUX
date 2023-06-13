import { ROLES } from 'src/constants/roles';
import { UsersEntity } from 'src/users/entities/users.entity';

export interface PayloadToken {
  sub: string;
  role: ROLES;
}


export interface AuthResponse {
  accessToken: string;
  user: UsersEntity;
}