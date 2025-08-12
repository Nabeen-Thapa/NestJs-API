import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { User } from 'generated/prisma';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UsersService } from './users.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
    constructor(private userService:UsersService){}

    @Get("me")
    getMe(@GetUser() user:User, @GetUser('email') email:string) {
        console.log(" user controller:",email)
        return user;
    }

    @Patch()
    editUser(@GetUser('id') userId: number, @Body() dto:EditUserDto){
        return this.userService.editUser(userId, dto)
    }
    @Get()
    getALlUsers() {
        return [];
    }

    @Get(":id")
    getSpecificUser(@Param("id") id: string) {
        return id;
    }

    @Post()
    createUser(@Body() user: {}) {

    }
}
