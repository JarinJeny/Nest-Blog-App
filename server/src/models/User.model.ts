/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { hash } from "bcryptjs";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema({timestamps:true,versionKey:false})
export class User{
    @Prop({required:true, trim:true})
    name:string
    @Prop({required:true, unique:true, lowercase:true})
    email:string
    @Prop({required:true})
    password:string
    
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre("save",async function(next){
    const user = this;
    if(user.isModified("password")){
        this.password = await hash(user.password,10)
    }
    next()
})

