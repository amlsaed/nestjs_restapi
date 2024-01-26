import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from "bcryptjs"
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
  constructor (
    @InjectModel(User.name)
    private userModel : Model<User>,
    private jwtService :JwtService
  ){}
  async signUp(createAuthDto: SignUpDto) : Promise<{taken : string}> {
    const {name , email , password } = createAuthDto
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await this.userModel.create({
      name,
      email,
      password : hashedPassword
    })

    const taken = this.jwtService.sign({id:user._id})
    
    return {taken}
  }

  
  async login(loginDto:LoginDto):Promise<{taken:string}>{
    const {email,password} = loginDto
    const user = await this.userModel.findOne({email})


    if(!user){throw new UnauthorizedException(" Invalid Email Or Password")}
     
    const isPasswordMatched = await bcrypt.compare(password,user.password)
    
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const taken = this.jwtService.sign({id:user._id})
    return {taken }
  }
}
