import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { Prisma as PrismaNamespace } from '@prisma/client';


@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signup(dto: AuthDto) {
        //generate password hash
        try {
            const hash = await argon.hash(dto.password as string)
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email as string,
                    hash
                }
            })

            return user;
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ForbiddenException('Credentials taken');
            }
            throw error;
        }

    }


    async signin(dto: AuthDto) {
        //find user
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email as string,
            }
        })
        if (!user) throw new ForbiddenException("invalid credentails");

        const pwdMatches = await argon.verify(user.hash, dto.password as string)
        if (!pwdMatches) throw new ForbiddenException("invalid passoword");
        
        const { hash, ...userWithoutHash } = user;
        return userWithoutHash;

    }
}