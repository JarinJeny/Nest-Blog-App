/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

export class RegisterUser{
    @IsNotEmpty({message:"Name is Required"})
    name : string 
    @IsEmail()
    @IsNotEmpty({message:"Email is Required"})
    email :string 

    @IsNotEmpty({message:"Password is Required"})
    @MinLength(6,{
        message:"Password should be grater than 6 characters"
    })
    password:string
    
}


export class LoginUser{
 
    @IsEmail()
    @IsNotEmpty({message:"Email is Required"})
    email :string 

    @IsNotEmpty({message:"Password is Required"})
    @MinLength(6,{
        message:"Password should be grater than 6 characters"
    })
    password:string
    
}