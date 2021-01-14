import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  controllers: [MoviesController], //컨트롤러 지정
  providers: [MoviesService], //서비스 지정
})
export class MoviesModule {}
