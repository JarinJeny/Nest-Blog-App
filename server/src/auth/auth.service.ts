/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUser,LoginUser } from 'src/dto/auth.dto';
import { User } from 'src/models/User.model';
import {compare} from 'bcryptjs'

@Injectable()
export class AuthService {

    constructor( @InjectModel(User.name) private userModel: Model<User>,private readonly jwtService:JwtService){}

   async registerUser(data:RegisterUser){
    const check_exist = await this.userModel.findOne({email:data.email.toLowerCase()})
    if(check_exist){
        throw new BadRequestException("User Already Exist")
    }
    

      const user=  await this.userModel.create(data);
      const token = await this.jwtService.sign({userId:user._id},{
        expiresIn:'30d'
      })

        return {
            msg:"Register Success",
            token
        }
    }

    async loginUser(data:LoginUser){
        const check_exist = await this.userModel.findOne({email:data.email.toLowerCase()})
        if(!check_exist){
            throw new BadRequestException("Account Does Not Exist")
        }
        const check_password = await compare(data.password,check_exist.password)
        if(!check_password){
            throw new UnauthorizedException("Invalid Credentials")
            
        }
     
          const token = await this.jwtService.sign({userId:check_exist._id},{
            expiresIn:'30d'
          })
    
            return {
                msg:"Login Success",
                token
            }
        }

        async userProfile(id:string){
          const check_exist = await this.userModel.findById(id).select("name email")
          if(!check_exist){
              throw new BadRequestException("Account Does Not Exist")
          }
          
        
      
              return check_exist
          }
  

}