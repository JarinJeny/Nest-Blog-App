/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from 'src/models/Blog.model';
import { AddBlogDTO ,BlogIdDTO} from 'src/dto/blog.dto';


@Injectable()
export class BlogService {
    constructor( @InjectModel(Blog.name) private readonly blogModel:Model<Blog> ){}



    async addBlog(user:string,data:AddBlogDTO){
        const tags = data.tags.split(",").map((c)=>c.trim());
        await this.blogModel.create({
            tags:tags,
            user,
            title:data.title,
            content:data.content,
            image:data.image
        })
        return {
            msg:"Blog Added :)"
        }
    }

    async getBlogs(){ 
      const blogs=  await this.blogModel.find({
            isPublic:true
        })
        .select("-content -createdAt -updatedAt -user -isPublic")
        return blogs
    }
    async getBlogById(data:BlogIdDTO){
        const blog = await this.blogModel.findOne({
            slug: new RegExp(data.slug,'i'),
            isPublic:true
        })
        .select("-_id -updatedAt -isPublic")
        .populate("user","name -_id")
        if(!blog){
            throw new NotFoundException("Blog Not Found")
        }
        return blog
    }
}