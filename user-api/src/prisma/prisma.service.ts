import { Injectable } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';
import { PrismaClient } from '../../generated/prisma'; 

@Injectable()
export class PrismaService extends PrismaClient{
    constructor(){
        super({
            datasources:{
                db:{
                  url:"postgresql://postgres:Nt@post@localhost:5434/nest?schema=public"
 
                }
            }
        })
    }
}
