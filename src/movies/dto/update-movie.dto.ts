 import { IsNumber, IsString } from 'class-validator'; //Validation 관한 데코레이터를 사용하기 위해
 import {PartialType} from '@nestjs/mapped-types'; // import mapped-types
import { CreateMovieDto } from './create-movie.dto';
export class UpdateMovieDto extends PartialType(CreateMovieDto) { //PartialType은 기본적으로 BaseType이 필요한데 그것을 CreateMovieDto로 지정
    //여기서 기본 뼈대는 CMD(CreateMovieDto) CMD내용중 무엇인가 빠지게 들어와도 인정해줌 

}
