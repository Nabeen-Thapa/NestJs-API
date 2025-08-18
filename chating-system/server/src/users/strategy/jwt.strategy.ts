import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { TokenPayload } from "../../types/user.types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jet'){
    constructor(){
        super({
            JwtFromRequest: ExtractJwt.FromExtractors([  (req: Request) => req.cookies?.access_token]), 
                  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
        })
    }
     async validate(payload: TokenPayload) {
    return payload; 
  }
}