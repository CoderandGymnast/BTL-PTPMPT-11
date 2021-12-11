import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from 'src/movies/dtos/CreateMovie.dto';
import { Genre } from 'src/movies/entities/Genre.entity';
import { Movie } from 'src/movies/entities/Movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async getMovies(): Promise<Movie[]> {
    return await this.movieRepository.find();
  }

  async getMovieById(id: number): Promise<Movie> {
    const Movie = await this.movieRepository.findOne({ id });
    if (!Movie) return null;
    return Movie;
  }

  async getMoviesByGenre(genre: string): Promise<Genre> {
    const genreMovie = await this.genreRepository.findOne(
      { name: genre },
      { relations: ['movies'] },
    );

    if (!genreMovie) return null;

    return genreMovie;
  }

  // createMovie(createMovieDto: CreateMovieDto) {
  //   const movie = this.movieRepository.create(createMovieDto);

  //   return this.movieRepository.save(movie);
  // }
}
