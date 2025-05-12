/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, MinLength,IsUrl,IsMongoId } from "class-validator"

export class AddBlogDTO{
    @IsNotEmpty({message:"Title is Required"})
    title: string
    @IsNotEmpty({message:"content is Required"})
    content: string
    @IsNotEmpty({message:"tags is Required"})
    tags: string
    @IsNotEmpty({message:"image is Required"})
    @IsUrl({})
    image:string
}


export class BlogIdDTO{
    @IsNotEmpty({message:"Slug is Required"})
    slug: string 
}