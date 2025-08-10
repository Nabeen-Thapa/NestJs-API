import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'generated/prisma';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {

    @Get("me")
    getMe(@GetUser() user:User) {
        console.log("controller:",user)
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
