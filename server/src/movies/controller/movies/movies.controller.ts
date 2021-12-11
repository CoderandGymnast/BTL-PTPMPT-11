import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMovieDto } from 'src/movies/dtos/CreateMovie.dto';
import { Movie } from 'src/movies/entities/Movie.entity';
import { MoviesService } from 'src/movies/services/movies/movies.service';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Find all movies' })
  async getMovies(): Promise<Movie[]> {
    return await this.moviesService.getMovies();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Find movie by Id' })
  async GetById(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
    return await this.moviesService.getMovieById(id);
  }

  @Get('genres/:genre')
  @ApiResponse({ status: 200, description: 'Find movies by genre' })
  async GetByGenre(@Param('genre') genre: string) {
    const ge = await this.moviesService.getMoviesByGenre(genre);
    console.log(ge);
    return ge;
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createMovie(@Body() createMovieDto: CreateMovieDto) {
    // return this.moviesService.createMovie(createMovieDto);
    return createMovieDto;
  }
}
