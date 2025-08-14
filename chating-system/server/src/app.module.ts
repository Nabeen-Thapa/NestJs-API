import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ChatsModule } from './chats/chats.module';
import { AuthModule } from './users/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/models/user.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST || 'localhost',
      port:5432,
      username:'postgres',
      password:'Nt@post',
      database: process.env.DATABASE || 'ChatingSystem',
      entities: [Users],
      synchronize: true,
      logging: false,
    }),
    UsersModule, ChatsModule, AuthModule]
})
export class AppModule {}
