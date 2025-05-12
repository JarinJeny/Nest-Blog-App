/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from 'src/models/Blog.model';
import { User, UserSchema } from 'src/models/User.model';
import { JwtModule } from '@nestjs/jwt';
import {config} from 'dotenv'
config({
    path:".env"
})
@Module({
  imports:[
    JwtModule.register({
      secret:process.env.JWT_AUTH
  }),
    MongooseModule.forFeature([
    {
      name:Blog.name,
      schema:BlogSchema
    },
    {
      name:User.name,
      schema:UserSchema
    }
    ])
  ],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
