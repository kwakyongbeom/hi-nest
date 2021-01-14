import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

@Module({
  imports: [MoviesModule], //모듈들을 import하는 공간
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
