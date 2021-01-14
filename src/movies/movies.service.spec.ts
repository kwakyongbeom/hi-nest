import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => { //Test를 하기전에 먼저 실행됨 
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService); //Test 할 수있게 미리 MoviceService를 얻어옴
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () =>{

    it("should return an array",() =>{
      const result=service.getAll(); //위 beforeEach를 통해 service를 정의하여 그 밑에있는 메소드를 테스트 할 수 있음
      expect(result).toBeInstanceOf(Array); //getALl의 결과는 반드시 Array가 되야함 
    });
  });

  describe("getOne", () =>{

    it("should return a movie object",() =>{
      service.create({
        title:'Test Movie',
        genres: ['test'],
        year: 2000,
      });  //getOne은 Movie 객체를 리턴해야 하므로 테스트 용 Movie객체를 하나선언

      const movie=service.getOne(1); //위 beforeEach를 통해 service를 정의하여 그 밑에있는 메소드를 테스트 할 수 있음
      expect(movie).toBeDefined(); //반드시 선언되 있어야함
      expect(movie.id).toEqual(1); //ID는 1이어야함 
    });
    it("should throw 404 error",()=>{ //애는 expect가  2개 이기 때문에 2개다 만족해야 passed가 뜸
      try {
        service.getOne(999);//없는 ID 999를 넣어줌 (Error를 발생시키기 위함)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException); //발생된 Error는 NotFoundExceptio 이어야 한다.
        expect(error.message).toEqual('Movie with ID 999 not found.'); //또한 발생한 error message는 Movie with ID 999 not found. 와 같아야함 
      }
    })
    
  });


  describe("deleteOne",()=>{

    it("delete a movie",() =>{
      service.create({
        title:'Test Movie',
        genres: ['test'],
        year: 2000,
      });  //DeleteOne은 Movie 객체를 리턴해야 하므로 테스트 용 Movie객체를 하나

      const beforeDelete=service.getAll().length; //삭제전의 배열의 길이 얻기 아마 1을 리턴
      service.deleteOne(1); //ID가 1인 것을 삭제
      const afterDelete=service.getAll().length; //삭제 후 배열의 길이 얻기 아마 0을 리턴
      expect(afterDelete).toBeLessThan(beforeDelete); // afterDelete < beforeDelete 이 맞으면 passed 아니면 fail 

    });

  });

  
  describe("create",()=>{

    it("Should create a movie",() =>{
      const beforeCreate=service.getAll().length; //생선전의 배열의 길이 얻기 아마 0을 리턴
      service.create({
        title:'Test Movie',
        genres: ['test'],
        year: 2000,
      }); //생성

      const afterCreate=service.getAll().length; //생성 후 배열의 길이 얻기 아마 1을 리턴
      expect(afterCreate).toBeGreaterThan(beforeCreate); // afterDelete > beforeDelete 이 맞으면 passed 아니면 fail 

    });

  });
  
});
