/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { LoginUser, RegisterUser } from 'src/dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('/api/v1/auth')
export class AuthController {
    constructor( private readonly authService:AuthService){}

    @Post('register')
    async registerUser(@Body() obj:RegisterUser) {
        const re_obj = await this.authService.registerUser(obj);
        return re_obj;
    }

    @Post('login')
    async loginUser(@Body() obj:LoginUser) {
        const res_obj = await this.authService.loginUser(obj);
        return res_obj;
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    async userProfile(@Request() req) {
        const res_obj = await this.authService.userProfile(req.user)
        return res_obj;
    }
}

