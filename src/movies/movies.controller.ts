import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entites/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies') // 여기가 기본 라우터  즉 localhost:3000/movies 이후 Get안에 주소는  movies 뒤에 붙음
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {} //MoviesService에 접근 하기위해 그때 moviesService변수로 접근
  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') movieId: number): Movie {
    // /:id의 id와 @Param의 id 와 일치해야함
    return this.moviesService.getOne(movieId);
  }

  @Delete(':id')
  remove(
    @Param('id') movieId: number, // /:id의 id와 @Param의 id 와 일치해야함
  ) {
    return this.moviesService.deleteOne(movieId);
  }

  @Post()
  create(
    @Body() moveieData: CreateMovieDto, //Post의 Request 내용인 Body를 movieData에 담아 사용
  ) {
    return this.moviesService.create(moveieData);
  }

  @Patch(':id')
  patch(
    @Param('id') movieId: number,
    @Body() updateData:UpdateMovieDto, // /:id의 id와 @Param의 id 와 일치해야함 ,Body 접근 updateData 변수로
  ) {
    return this.moviesService.update(movieId,updateData);
  }
}
