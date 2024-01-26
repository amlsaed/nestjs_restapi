import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  signUp(@Body() signUpDto: SignUpDto) : Promise<{taken : string}>{
    return this.authService.signUp(signUpDto);
  }


  @Post("/login")
  logIn(@Body() loginDto:LoginDto) : Promise<{taken:string}>{
    return this.authService.login(loginDto)
  }

  

  

}
