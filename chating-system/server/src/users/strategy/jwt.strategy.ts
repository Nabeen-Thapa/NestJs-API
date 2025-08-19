import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { TokenPayload } from "../../types/user.types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.access_token; // 👈 extract from cookie
        },
      ]),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET || "Q@SpU87P17rByoN0odlu?gVO2-zieRdGAq!%UDLExA3K",
    });
  }

  async validate(payload: TokenPayload) {
    return payload;
  }
}
