/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/User.model';
import { JwtModule } from '@nestjs/jwt';
import {config} from 'dotenv'
config({
    path:".env"
})
@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name:User.name,
                schema:UserSchema
            }
        ]),
        JwtModule.register({
            secret:process.env.JWT_AUTH
        })
    ],
    controllers:[AuthController],
    providers:[AuthService]
})
export class AuthModule {}

