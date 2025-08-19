import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/models/user.model';
import { Session } from '../users/models/user-session.model';
import { ChatMessage } from './models/chattings.model';

@Module({
   imports: [TypeOrmModule.forFeature([ChatMessage,Users, Session])],
  providers: [ChatsService, ],
  controllers: [ChatsController, ]
})
export class ChatsModule {}
