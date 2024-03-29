import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Userschema } from './schemas/user.schema';
@Module({
  imports:[
    PassportModule.register({defaultStrategy:"jwt"}),
    JwtModule.registerAsync({
    inject:[ConfigService],
    useFactory:(config:ConfigService)=>{
      return{
        secret: config.get<string>("JWT_SECRET"),
        signOptions : {
          expiresIn :  config.get("JWT_EXPIRES")
        }
      }
    }
    }),
    MongooseModule.forFeature([{name:"User",schema:Userschema}])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
