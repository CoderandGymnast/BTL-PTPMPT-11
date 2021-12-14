import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from 'src/movies/dtos/CreateMovie.dto';
import { Genre } from 'src/movies/entities/Genre.entity';
import { Movie } from 'src/movies/entities/Movie.entity';
import { getConnection, Repository } from 'typeorm';

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

  async createMovie(createMovieDto: CreateMovieDto) {
    const checkMovie = await this.movieRepository.findOne({
      title: createMovieDto.title,
    });

    if (checkMovie) {
      return 'movie already exist';
    }

    const newMovie = this.movieRepository.create({
      title: createMovieDto.title,
      description: createMovieDto.description,
      runtime: createMovieDto.runtime,
      posterPath: createMovieDto.posterPath,
      backdropPath: createMovieDto.backdropPath,
    });
    await this.movieRepository.save(newMovie);

    for (const genre of createMovieDto.genres) {
      const checkGenre = await this.genreRepository.findOne({
        name: genre,
      });

      const newGenre = this.genreRepository.create({ name: genre });

      if (checkGenre) {
        await getConnection()
          .createQueryBuilder()
          .relation(Genre, 'movies')
          .of(checkGenre)
          .add(newMovie);
      } else {
        newGenre.movies = [newMovie];
        await this.genreRepository.save(newGenre);
      }
    }
    return 'done';
  }
}
