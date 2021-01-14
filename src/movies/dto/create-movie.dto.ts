import { IsNumber, IsOptional, IsString } from 'class-validator'; //Validation 관한 데코레이터를 사용하기 위해

export class CreateMovieDto {
  //DTO (Data Transfer Object)
  @IsString() //title이 String이 들어왔나?
  readonly title: string;

  @IsNumber() // year가 number로 들어왔나?
  readonly year: number;

  @IsOptional() // 밑에 genres는 필수가 아님, 하지만 온다면 밑에 IsString 검사를 해야함 
  @IsString({ each: true }) //each 옵션은 글자 하나하나 string이 맞나
  readonly genres: string[];
}
