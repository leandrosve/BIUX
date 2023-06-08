import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  
  login(){
    return 'login from service'
  }

  register(){
    return 'register from service'
  }
}
