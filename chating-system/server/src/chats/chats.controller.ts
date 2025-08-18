import { Body, Controller, Delete, Get, Post, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';  
import { SendMessageDto } from './dto/sendMessage.dto';
import { AuthGuard } from '@nestjs/passport';
import { ChatsService } from './chats.service';
import { validateDto } from 'src/common/utils/dtoValidateResponse.utils';


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

    @Get("receive")
    async receiveMessage() {

    }

    @Delete("delete")
    async deleteMessage() {

    }
}
