import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config:ConfigService) { }

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

        // const { hash, ...userWithoutHash } = user;
        // return userWithoutHash;
        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email:string):Promise<{access_token: string}>{
        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get("JWT_SECRET");
        const token = await this.jwt.signAsync(payload, {
            expiresIn: "15m",
            secret: secret,
        });
        return {access_token: token};
    }
}