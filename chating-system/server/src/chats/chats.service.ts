import { Injectable } from '@nestjs/common';
import { SendMessageDto } from './dto/sendMessage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessage } from './models/chattings.model';
import { Repository } from 'typeorm';
import { Users } from 'src/users/models/user.model';
import { waitForDebugger } from 'inspector';
import { AppError } from 'src/common/utils/response.utils';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class ChatsService {
    constructor(
        @InjectRepository(ChatMessage) private readonly chatRepo: Repository<ChatMessage>,
        @InjectRepository(Users)
        private readonly userRepo: Repository<Users>,) { }
    async sendMessage(sendMessage: SendMessageDto) {

        const sender = await this.userRepo.findOne({ where: { id: sendMessage.senderId } })
        if(!sender) throw new AppError("send not found", StatusCodes.NOT_FOUND)

        const receiver = await this.userRepo.findOne({ where: { id: sendMessage.receiverId } })
        if(!receiver) throw new AppError("send not found", StatusCodes.NOT_FOUND);

        const newMessage = this.chatRepo.create({
            sender,
            receiver,
            message: sendMessage.message,
        });
        const saveMessage = await this.chatRepo.save(newMessage)
        return saveMessage

    }

    async receiveMessage() {

    }

    async deleteMessage() {

    }

    async updateMessage() {

    }
}
