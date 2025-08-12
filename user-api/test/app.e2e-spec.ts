//end to end test

import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { PrismaService } from "../src/prisma/prisma.service";
import * as pactum from "pactum";
import { AuthDto } from "../src/auth/dto";
import passport from "passport";

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true
    }))
    await app.init();
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
     await app.listen(3333)
    pactum.request.setBaseUrl('http://localhost:3333'); 
     

  });
  afterAll(async() => {
   await app.close();
  })

  describe('auth', () => {
    const dto: AuthDto = {
      email: "nabin@gmail.com",
      password: "123",
    }
    describe('Signup', () => {
      it("shhould throw email empty", () => {
        return pactum.spec().post('/auth/signup',).withBody({
          password: dto.password
        }).expectStatus(400);
        
      })
      it("shhould throw passowrd empty", () => {
        return pactum.spec().post('/auth/signup',).withBody({
          email: dto.email
        }).expectStatus(400);
        
      })
      it("shhould throw if no body", () => {
        return pactum.spec().post('/auth/signup',).expectStatus(400);
        
      })
      it("should signup", () => {
        return pactum.spec().post('/auth/signup',).withBody(dto).expectStatus(201);
      });
    });
    describe('signin', () => {
      it("shhould throw email empty", () => {
        return pactum.spec().post('/auth/signin',).withBody({
          password: dto.password
        }).expectStatus(400);
        
      })
      it("shhould throw passowrd empty", () => {
        return pactum.spec().post('/auth/signin',).withBody({
          email: dto.email
        }).expectStatus(400);
      })

      it("shhould throw if no body", () => {
        return pactum.spec().post('/auth/signin',).expectStatus(400);
        
      })
      it("should signin", () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(201)
          .stores('usersAt', 'access_token');
      });
    });

  });
  describe('users', () => {
    describe('Get Me', () => {
      //  it("should get current user", () => {
      //   return pactum
      //     .spec()
      //     .get('/user/me')  
      //     .withHeaders({
      //       Authorization: `Bearer $S{usersAt}`
      //     })
      //     .expectStatus(201);
      // });
     });
    describe('Edit user', () => { });

  });
  describe('bookmark', () => {
    describe('create bookmarks', () => { });
    describe('Get bookmarks', () => { });
    describe('Get bookmarks by id', () => { });
    describe('Edit bookmarks', () => { }); describe('Delete bookmarks', () => { });
  });
})