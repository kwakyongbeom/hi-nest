import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('movies') // 여기가 기본 라우터  즉 localhost:3000/movies 이후 Get안에 주소는  movies 뒤에 붙음 
export class MoviesController 
{

    @Get()
    getAll()
    {
        return 'This will return all movies'
    }

    @Get("search") //:id 위에 두는 이유는 만약 search가 밑에 있으면 /search를 id로 인식하여 밑에 route로 가기 때문에 
    search(@Query('year') searchingYear:string) //Get은 Param이 아닌 Query로 접근
    {
        return `We are searching for a moive made after:${searchingYear}`;
    }

    @Get(':id')
    getOne(@Param('id') movieId:string)  // /:id의 id와 @Param의 id 와 일치해야함
    {
        return `This will return one movie with the id:${movieId}`;
    }

    @Delete(':id')
    remove(@Param('id') movieId:string) // /:id의 id와 @Param의 id 와 일치해야함
    {
        return `This will delete one movie with the id:${movieId}`;
    }

    @Post()
    create(@Body() moveieData) //Post의 Request 내용인 Body를 movieData에 담아 사용  
    {
        return moveieData.name; //Json의 name 값 접근 
    }

    @Patch(':id')
    patch(@Param('id') movieId:string,@Body() updateData) // /:id의 id와 @Param의 id 와 일치해야함 ,Body 접근 updateData 변수로 
    {
        return{         
            updateMovie:movieId,
            ...updateData
        };
    }

   
}
