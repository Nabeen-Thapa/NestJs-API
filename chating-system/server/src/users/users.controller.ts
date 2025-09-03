import { Controller, Delete, Get, Put, Req, Res, UseGuards } from '@nestjs/common';
import { sendError } from '../common/utils/response.utils';
import type { Request, Response } from 'express';
import { UsersService } from './users.service';
import { PassThrough } from 'stream';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
    constructor(private userServices: UsersService) { }
    @Get("/:id/viewUser")
    async viewUser(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
       
    }

    @Put("/viewUser")
    async updateUser() {
        try {

        } catch (error) {
            console.log("user view chat controller error:", error.message);
            return sendError("register fail:", error);
        }
    }

    @Delete("/viewUser")
    async deleteUser() {
        try {

        } catch (error) {
            console.log("user view chat controller error:", error.message);
            return sendError("register fail:", error);
        }
    }

}
