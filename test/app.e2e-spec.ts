import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest'; //request를 위한 테스를 하기 위해
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => { //원래는 beforeeach 였는데 beforeAll로 바꿈, 그 이유는 새로운 테스트를 진행할 때마다 어플리케이션이 새로 생성되는 것을 방지하기 위해 모든 테스트 적용
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports:[AppModule] //App 생성 
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes( //파이프 뚫기 ,main.ts에 적용한 것을 test app에도 그대로 적용해줘야함 
      new ValidationPipe({
        whitelist: true, // 데코레이터를 통한 유효성 검사를 하지않는 놈들 걸러낸다(@IsString 등)
        forbidNonWhitelisted: true, //위 조건 즉 데코레이터를 통한 유효성 검사를 하지않으면 리퀘스트 자체가 안되게 막음
        transform: true, //유저들이 보낸 정보를 해당 DTO 매개변수에 맞게 타입을 자동으로 바꿔줌
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to My API page');
  });

  it("/movies (GET)",() =>{
    return request(app.getHttpServer()) //request보내기
    .get('/movies') //url movies로 GET 통신
    .expect(200) // stats code가 200이길 희망한다
    .expect([]); //빈 배열을 받길 희망한다

  });

  it("/movies (POST)",() =>{
    return request(app.getHttpServer()) //request보내기
    .post('/movies') //url movies로 POST 통신
    .send({ //json 객체 보내기
      title:'Test',
      year:2000,
      genres:['test']
    })
    .expect(201) // stats code가 201이길 희망한다
    
  });

  it("/movies (DLETE)",() =>{
    return request(app.getHttpServer()) //request보내기
    .delete('/movies') //url movies로 DELETE 통신
    .expect(404) // stats code가 404이길 희망한다
    
  });

  it("GET 200",() =>{
    return request(app.getHttpServer()) //request보내기
    .get('/movies/1') //url movies로 id=1로 get 통신
    .expect(200) // stats code가 200이길 희망한다
    
  });

  it("PATCH",() =>{
    return request(app.getHttpServer()) //request보내기
    .patch('/movies/1') //url movies로 POST 통신
    .send({ //json 객체 보내기
      title:'Update Test',
    })
    .expect(200) // stats code가 200이길 희망한다
    
  });
  it("DELET",() =>{
    return request(app.getHttpServer()) //request보내기
    .delete('/movies/1') //url movies로 id=1로 get 통신
    .expect(200) // stats code가 200이길 희망한다
    
  });
});
