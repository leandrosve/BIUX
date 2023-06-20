import { ROLES } from 'src/constants/roles';
import { UsersEntity } from 'src/users/entities/users.entity';

export interface PayloadToken {
  sub: number;
  role: ROLES;
}


export interface AuthResponse {
  accessToken: string;
  user: UsersEntity;
}

export interface IAuthTokenResult {
  role: string;
  sub:  number;
  iat:  number;
  exp:  number;
}

export interface IUseToken {
  role: string;
  sub:  number;
  isExpired: boolean
}