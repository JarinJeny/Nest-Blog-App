/* eslint-disable prettier/prettier */
import { Controller,Post,UseGuards,Request,Body,Get,Param } from '@nestjs/common';
import {BlogService} from 'src/blog/blog.service';
import {AuthGuard} from 'src/auth/auth.guard';
import {AddBlogDTO,BlogIdDTO} from 'src/dto/blog.dto';
@Controller('/api/v1/blog')
export class BlogController {
    constructor(private readonly blogService:BlogService){}

    @Post("/add")
     @UseGuards(AuthGuard)
   async addBlog(@Request() req,@Body() data:AddBlogDTO){
        const res_obj = await this.blogService.addBlog(req.user,data);
        return res_obj;
    }


    @Get("/get-all")
    async getBlogs(){
        const res_obj = await this.blogService.getBlogs()
        return res_obj
    }

    @Get("/get/:slug")
    async getBlogById(@Param() data:BlogIdDTO){
        const res_obj = await this.blogService.getBlogById(data)
        return res_obj
    }
}