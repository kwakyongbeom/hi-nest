import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( //파이프 뚫기
    new ValidationPipe({
      whitelist: true, // 데코레이터를 통한 유효성 검사를 하지않는 놈들 걸러낸다(@IsString 등)
      forbidNonWhitelisted: true, //위 조건 즉 데코레이터를 통한 유효성 검사를 하지않으면 리퀘스트 자체가 안되게 막음
      transform: true, //유저들이 보낸 정보를 해당 DTO 매개변수에 맞게 타입을 자동으로 바꿔줌
    }),
  );
  await app.listen(3000);
}
bootstrap();
