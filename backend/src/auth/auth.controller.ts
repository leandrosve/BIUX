import { Body, Controller, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto';
import { RegisterUserDTO } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(private authService:AuthService){}

  @Post('login')
  login(@Body()dto:LoginAuthDto){
    return this.authService.login()
  }

  @Post('register')
  public async registerUser(@Body() body:RegisterUserDTO){
    return await this.authService.register(body)
  }
   
}
