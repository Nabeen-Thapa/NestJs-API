import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../models/user.model';
import { Session } from '../models/user-session.model';

@Module({
   imports: [TypeOrmModule.forFeature([Users, Session])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
