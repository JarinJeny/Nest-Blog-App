/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {config} from 'dotenv'
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { QouteModule } from './qoute/qoute.module';

config({
  path:'.env'
})
@Module({
  imports: [
  MongooseModule.forRoot(process.env.MONGO_URI!),
  AuthModule,
  BlogModule,
  QouteModule,  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

