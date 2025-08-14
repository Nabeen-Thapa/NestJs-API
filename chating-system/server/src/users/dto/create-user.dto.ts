import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"


export class CreateUser {
    @IsString()
    @IsNotEmpty()
    name:string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password:string

    @IsNumber()
    phone: number

}