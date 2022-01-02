import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from 'src/movies/dtos/CreateMovie.dto';
import { RateMovieDto } from 'src/movies/dtos/RateMovie.dto';
import { Cast } from 'src/movies/entities/Cast.entity';
import { Genre } from 'src/movies/entities/Genre.entity';
import { Movie } from 'src/movies/entities/Movie.entity';
import { Rating } from 'src/movies/entities/Rating.entity';
import { Video } from 'src/movies/entities/Video.entity';
import { User } from 'src/users/entities/User.entity';
import { getConnection, Like, Repository } from 'typeorm';
import axios from 'axios';

const randomList = (length, List) => {
  for (let i = 0; i < length; i++) {
    List.push(Math.floor(Math.random() * length) + 1);
  }
};

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
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) {}

  listMovie = [];

  async getMovies(): Promise<Movie[]> {
    return await this.movieRepository.find();
  }

  async getGenres(user: any): Promise<Genre[]> {
    const { userId } = user;
    const numMovie = 100;
    this.listMovie = [];

    try {
      const { data } = await axios.get(
        `http://localhost:5000/get_recommendations?user_id=${userId}&num_movies=${numMovie}`,
      );
      this.listMovie = data;
      console.log(data);
    } catch (error) {
      console.error('error');
    }
    return await this.genreRepository.find();
  }

  async getMovieById(id: number, user: any) {
    const { userId } = user;
    let Movie = await this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.videos', 'video')
      .leftJoinAndSelect('movie.casts', 'cast')
      .leftJoinAndSelect('movie.genres', 'genre')
      .leftJoinAndSelect('movie.ratings', 'rating')
      .leftJoin('rating.user', 'user')
      .where('movie.id = :id', { id })
      .andWhere('user.id = :userId', { userId })
      .getOne();

    if (!Movie) {
      Movie = await this.movieRepository.findOne(
        { id },
        { relations: ['genres', 'casts', 'videos'] },
      );

      if (!Movie) return null;
    }

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
      // .take(30)
      .getMany();

    if (!movies) return null;

    const newList = [];

    if (this.listMovie.length > 0) {
      for (const id of this.listMovie) {
        const findMovie = movies.find((movie) => movie.id == id);

        if (findMovie) newList.push(findMovie);
      }
      return newList;
    }

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

  async setRatingMovie(rateMovieDto: RateMovieDto, user: any) {
    const { movie: movieId, rating } = rateMovieDto;
    const { userId } = user;

    const checkMovie = await this.movieRepository.findOne({ id: movieId });
    if (!checkMovie) return null;

    const checkUser = await this.userRepository.findOne({ id: userId });
    if (!checkUser) return null;

    const newRating = await this.ratingRepository.create({
      rating,
    });

    newRating.movie = checkMovie;
    newRating.user = checkUser;

    await this.ratingRepository.save(newRating);

    return newRating;
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
