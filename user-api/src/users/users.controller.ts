import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    getALlUsers(){
        return [];
    }

    @Get(":id")
    getSpecificUser(@Param("id")id:string ){
        return id;
    }

    @Post()
    createUser(@Body() user:{}){
        
    }
}
