/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Schema,Prop, SchemaFactory} from "@nestjs/mongoose";
import { User } from "./User.model";
import * as mongoose from 'mongoose';
import slugify from 'slugify'
import { v4 as uuidv4 } from 'uuid';
export type BlogDocument = mongoose.HydratedDocument<Blog>;

@Schema({
    timestamps:true,
    versionKey:false
})
export class Blog{
    @Prop({
        required:true,
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User'

    })
    user:User
    @Prop({
        required:true,
        trim:true,
        type: String,
    })
    title:string
    @Prop({
        default:'',
        trim:true,
        type: String,
    })
    slug:string
    @Prop({
        required:true,
        trim:true,
        type: String,
    })
    content:string 
    @Prop({
        required:true,
        trim:true,
        type: String,
    })
    image:string

    @Prop({
        required:true,
        trim:true,
        type: [String],
    })
    tags:string[]
    @Prop({
        default:true,
        type: Boolean,
    })
    isPublic:boolean

}


export const BlogSchema = SchemaFactory.createForClass(Blog);

BlogSchema.pre("save",async function(next){
    const blog= this;
    if(blog.isModified("title")){
       this.slug= slugify(blog.title+" "+ uuidv4(), {
            replacement: '-',  
            remove: undefined,
            lower: false,    
            strict: false,   
            locale: 'vi',   
            trim: true
          })
    }
    next()
})