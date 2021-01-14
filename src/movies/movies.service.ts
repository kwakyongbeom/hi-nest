import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie} from './entites/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];
  /*
    export class Movie{ //데이터 베이스 대신 사용 
    id: number;
    title:string;
    year:number;
    genres:string[];
}
    */
  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id); //Movie 배열은 movies 에서 class를 movie로 접근 하여 movie의 id가 parmeter로 넘어온 id와 같냐? +id는 string 을 number로 바꿔주기 위해

    if (!movie) {
      //존재 하지 않으면 movie가 undefined
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  deleteOne(id: number): void {
    this.getOne(id); //존재하는지 getOne을 통해 확인하고
    this.movies = this.movies.filter((movie) => movie.id !== id); //다르면 제거하고 다시 초기화
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id); //검사하고
    this.deleteOne(id); //먼저 지우고
    console.log(this.movies);
    this.movies.push({ ...movie, ...updateData });
    console.log(this.movies);
  }
}
