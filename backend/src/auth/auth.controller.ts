import { Body, Controller, Post, Put, UnauthorizedException, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from './dto/register.dto';
import { LoginAuthDto } from './dto/auth.dto';
import { StudentCodePipe } from './pipes/studentCode.pipe';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(private authService:AuthService){}

  @Post('login')
  async login(@Body() { email, password }: LoginAuthDto) {
    email=email.toLowerCase();
    const userValidate = await this.authService.validateUser(
      email,
      password,
    );

    if (!userValidate) {
      throw new UnauthorizedException('Data not valid');
    }

    const jwt = await this.authService.generateJWT(userValidate);

    return jwt;
  }
  @UsePipes(new StudentCodePipe())
  @Post('register')
  public async registerUser(@Body() body:RegisterUserDTO){
    body.email=body.email.toLowerCase()
    return await this.authService.register(body)
  }
   
}
