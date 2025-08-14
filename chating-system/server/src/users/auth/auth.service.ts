import { Injectable } from '@nestjs/common';
import { Users } from '../models/user.model';
import { CreateUser } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppError } from 'src/common/utils/response.utils';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(Users)
    private readonly userRepo: Repository<Users>,) { }

    async userRegister(userData: CreateUser) {
        try {

            const isExist = await this.userRepo.findOne({ where: { email: userData.email } });
            if (isExist) throw new AppError('User already exists', 400);

            const user = await this.userRepo.create({
                name: userData.name,
                email: userData.email,
                password: userData.password,
                phone: userData.phone

            })
            await this.userRepo.save(user);
        } catch (error) {
            console.log("register service error:", error.message)
            throw new AppError(error.message || 'Registration failed', 500);
        }
    }

    async userLogin() {

    }
}
