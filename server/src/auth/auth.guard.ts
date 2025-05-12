/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private readonly jwtService:JwtService){}

  canActivate(
    context: ExecutionContext,
  ): boolean {


      try{
        const request = context.switchToHttp().getRequest(); 
      const auth_Header = request.headers['authorization'] ||''
      if(!auth_Header || !auth_Header.startsWith("Bearer ")){
        throw new UnauthorizedException("please Login First")
      }

      const token = auth_Header.split(" ")[1]
      if(!token){
        throw new UnauthorizedException("Invalid Token")
      }
      const payload = this.jwtService.verify(token);
      request.user = payload.userId;


    return true;
      }catch(e){
        throw new UnauthorizedException(e.message)

        return false;
      }
  }
}