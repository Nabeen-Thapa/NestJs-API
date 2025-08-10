import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

    @UseGuards(AuthGuard('jwt'))
    @Get("me")
    getMe(@Request() req) {
        console.log("controller:",req.user)
        return req.user;
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
