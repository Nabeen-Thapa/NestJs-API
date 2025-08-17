import { Injectable } from '@nestjs/common';
import { Users } from '../models/user.model';
import { CreateUser } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppError } from 'src/common/utils/response.utils';
import { loginDto } from '../dto/login.dto';
import { compare, hash } from "bcrypt";
import { TokenPayload } from 'src/types/user.types';
import { generateAccessToken, generateRefreshToken } from 'src/common/config/jwt.config';
import { Session } from '../models/user-session.model';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users) private readonly userRepo: Repository<Users>,
        @InjectRepository(Session) private sessionRepo: Repository<Session>,) { }

    async userRegister(userData: CreateUser) {
        try {

            const isExist = await this.userRepo.findOne({ where: { email: userData.email } });
            if (isExist) throw new AppError('User already exists', 400);

            const hashedPwd = await hash(userData.password, 10)
            const user = await this.userRepo.create({
                name: userData.name,
                email: userData.email,
                password: hashedPwd,
                phone: userData.phone

            })
            await this.userRepo.save(user);
        } catch (error) {
            console.log("register service error:", error.message)
            throw new AppError(error.message || 'Registration failed', 500);
        }
    }

    async userLogin(data:loginDto) {
        try {

            const user = await this.userRepo.findOne({where:{email: data.email}})
            if(!user) throw new AppError("you are not registerd yet");

            //const hashedPassword = user ? user.password : "kfghidf@#cfgh1&8"; 
            const pwdValid = await compare(data.password, user.password) 
             if(!pwdValid) throw new AppError("your password is not valid");

             const payload: TokenPayload = {
                userId: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone
             }

            const accessToken = await generateAccessToken(payload);
            const refreshToken = await generateRefreshToken(payload);

            const newSession = await this.sessionRepo.create({
                userId: user.id,
                AccessToken: accessToken,
            })
            await this.sessionRepo.save(newSession);
            const {name, email} = user;
            return{
                accessToken,
                user:{ name, email }
            }
            
        } catch (error) {
             console.log("Login error:", (error as Error).message);
            throw error;
        }
    }
}
