import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUser } from '../dto/create-user.dto';
import { sendError, sendSuccess } from 'src/common/utils/response.utils';

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
    async userLogin(){

    }
}
