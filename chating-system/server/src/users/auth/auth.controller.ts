import { Body, Controller, Post, Res } from '@nestjs/common'; 
import type { Response } from 'express';  
import { AuthService } from './auth.service';
import { CreateUser } from '../dto/create-user.dto';
import { sendError, sendSuccess } from 'src/common/utils/response.utils';
import { loginDto } from '../dto/login.dto';
import { setAuthCookies } from '../utils/authCookie.utils';

@Controller('user/auth')
export class AuthController {
   constructor(private authService: AuthService){}

    @Post("register")
    async userRegister(@Body() userData: CreateUser){
        try {
            console.log(userData);
            const register  = await this.authService.userRegister(userData);
            return sendSuccess("registered successfully")
        } catch (error) {
            console.log("user regsiter controller error:", error.message);
            return sendError("register fail:", error.message);
        }
    }
    @Post("login")
    async userLogin(@Body() loginData: loginDto,  @Res({ passthrough: true }) res: Response){
        console.log("login data:" ,loginData)
        try {
            const login =  await this.authService.userLogin(loginData);
            
            setAuthCookies(res, login.accessToken, login.refreshToken)
            return sendSuccess("login success", login)
        } catch (error) {
            console.log("user regsiter controller error:", error.message);
            return sendError("register fail:", error);
        }
    }
}
