import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { User } from 'generated/prisma';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {

    @Get("me")
    getMe(@GetUser() user:User, @GetUser('email') email:string) {
        console.log(" user controller:",email)
        return user;
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
