import { Body, Controller, Delete, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { SendMessageDto } from './dto/sendMessage.dto';
import { AuthGuard } from '@nestjs/passport';
import { ChatsService } from './chats.service';
import { validateDto } from 'src/common/utils/dtoValidateResponse.utils';
import { sendError } from 'src/common/utils/response.utils';


@UseGuards(AuthGuard('jwt'))
@Controller('chats')
export class ChatsController {
    constructor(private chatService: ChatsService) { }
    @Post("send")
    async sendMessage(@Body() sendMessage: SendMessageDto, @Res({ passthrough: true }) res: Response) {
        const chatValidate = await validateDto(SendMessageDto, sendMessage, res)
        if (!chatValidate.valid) return;
        const send = await this.chatService.sendMessage(chatValidate.data);
    }

    @Get("receive/:id")
    async receiveMessage(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        try {
            const senderId = req.params.id;
          
        } catch (error) {
            console.log("user view chat controller error:", error.message);
            return sendError("register fail:", error);
        }
    }

    @Delete("delete")
    async deleteMessage() {

    }
}
