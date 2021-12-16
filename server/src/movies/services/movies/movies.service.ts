import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from 'src/movies/dtos/CreateMovie.dto';
import { Cast } from 'src/movies/entities/Cast.entity';
import { Genre } from 'src/movies/entities/Genre.entity';
import { Movie } from 'src/movies/entities/Movie.entity';
import { Video } from 'src/movies/entities/Video.entity';
import { getConnection, Like, Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(Cast)
    private readonly castRepository: Repository<Cast>,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  async getMovies(): Promise<Movie[]> {
    return await this.movieRepository.find();
  }

  async getGenres(): Promise<Genre[]> {
    return await this.genreRepository.find();
  }

  async getMovieById(id: number): Promise<Movie> {
    const Movie = await this.movieRepository.findOne(
      { id },
      { relations: ['genres', 'casts', 'videos'] },
    );
    if (!Movie) return null;
    return Movie;
  }

  async getMovieByTitle(title: string, limit?: number): Promise<Movie[]> {
    if (!title) {
      return [];
    }

    const movies = await this.movieRepository.find({
      select: ['id', 'title', 'posterPath'],
      where: {
        title: Like(`%${title}%`),
      },
      take: limit || 10,
    });

    return movies;
  }

  async getMoviesByGenre(genre: string): Promise<Movie[]> {
    const movies = await getConnection()
      .getRepository(Movie)
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.genres', 'genre')
      .where('genre.name = :genre', { genre })
      .take(30)
      .getMany();

    if (!movies) return null;

    return movies;
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

    const casts = [];

    for (const cast of createMovieDto.casts) {
      const { name, profilePath } = cast;

      const newCast = this.castRepository.create({ name, profilePath });

      await this.castRepository.save(newCast);

      casts.push(newCast);
    }

    newMovie.casts = casts;

    const videos = [];

    for (const video of createMovieDto.videos) {
      const { name, videoPath } = video;

      const newVideo = this.videoRepository.create({ name, videoPath });

      await this.videoRepository.save(newVideo);

      videos.push(newVideo);
    }

    newMovie.videos = videos;
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

  async deleteMovie(id: number) {
    const movie = await this.movieRepository.findOne({ id });

    if (!id) {
      return 'movie is not exist';
    }

    await this.movieRepository.remove(movie);

    return 'done';
  }
}
