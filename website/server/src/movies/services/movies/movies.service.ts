import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from 'src/movies/dtos/CreateMovie.dto';
import { RateMovieDto } from 'src/movies/dtos/RateMovie.dto';
import { Cast } from 'src/movies/entities/Cast.entity';
import { Genre } from 'src/movies/entities/Genre.entity';
import { MovieDetails } from 'src/movies/entities/MovieDetails.entity';
import { Rating } from 'src/movies/entities/Rating.entity';
import { Video } from 'src/movies/entities/Video.entity';
import { User } from 'src/users/entities/User.entity';
import { getConnection, Like, Repository } from 'typeorm';
import axios from 'axios';
import { Movie } from 'src/movies/entities/Movie.entity';
@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieDetails)
    private readonly movieDetailRepository: Repository<MovieDetails>,
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
  numMovie = 200;

  async getMovies(): Promise<MovieDetails[]> {
    return await this.movieDetailRepository.find();
  }

  async getGenres(user: any): Promise<Genre[]> {
    const { userId } = user;
    this.listMovie = [];

    try {
      const { data } = await axios.get(
        `http://ms:5000/get_recs?user_id=${userId}&num_movies=${this.numMovie}`,
      );
      if (isNaN(data[0])) {
        throw new Error('data must be string of number');
      }
      this.listMovie = data;
      console.log('done');
    } catch (error) {
      console.error(error);
    }
    return await this.genreRepository.find();
  }

  async getMovieById(id: number, user: any) {
    const { userId } = user;
    let Movie = await this.movieDetailRepository
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
      Movie = await this.movieDetailRepository.findOne(
        { id },
        { relations: ['genres', 'casts', 'videos'] },
      );

      if (!Movie) return null;
    }

    return Movie;
  }

  async getMovieByTitle(
    title: string,
    limit?: number,
  ): Promise<MovieDetails[]> {
    if (!title) {
      return [];
    }

    const movies = await this.movieDetailRepository.find({
      select: ['id', 'title', 'posterPath'],
      where: {
        title: Like(`%${title}%`),
      },
      take: limit || 10,
    });

    return movies;
  }

  async getMoviesByGenre(genre: string): Promise<MovieDetails[]> {
    const numMoviesTake = 60;
    const movies = await getConnection()
      .getRepository(MovieDetails)
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.genres', 'genre')
      .where('genre.name = :genre', { genre })
      .orderBy('RAND()')
      .getMany();

    if (!movies) return null;

    const newList = [];

    if (this.listMovie.length > 0) {
      for (const id of this.listMovie) {
        const findMovie = movies.find((movie) => movie.id == id);

        if (findMovie) newList.push(findMovie);
      }

      if (newList.length < numMoviesTake) {
        const randomMovies = await getConnection()
          .getRepository(MovieDetails)
          .createQueryBuilder('movie')
          .leftJoinAndSelect('movie.genres', 'genre')
          .where('genre.name = :genre', { genre })
          .andWhere('movie.id NOT IN (:...listMovie)', {
            listMovie: this.listMovie,
          })
          .orderBy('RAND()')
          .take(numMoviesTake - newList.length)
          .getMany();

        newList.push(...randomMovies);
      }

      return newList;
    }

    return movies.slice(0,numMoviesTake);
    // if (this.listMovie.length > 0) {
    //   const movies = await getConnection()
    //     .getRepository(MovieDetails)
    //     .createQueryBuilder('movie')
    //     .leftJoinAndSelect('movie.genres', 'genre')
    //     .where('genre.name = :genre', { genre })
    //     .andWhere('movie.id IN (:...listMovie)', { listMovie: this.listMovie })
    //     .getMany();

    //   if (!movies) return null;

    //   return movies;
    // }

    // const movies = await getConnection()
    //   .getRepository(MovieDetails)
    //   .createQueryBuilder('movie')
    //   .leftJoinAndSelect('movie.genres', 'genre')
    //   .where('genre.name = :genre', { genre })
    //   .take(this.numMovie)
    //   .getMany();

    // if (!movies) return null;

    // // const newList = [];
    // // if (this.listMovie.length > 0) {
    // //   for (const id of this.listMovie) {
    // //     const findMovie = movies.find((movie) => movie.id == id);

    // //     if (findMovie) newList.push(findMovie);
    // //   }
    // //   return newList;
    // // }

    // return movies;
  }

  async createMovie(createMovieDto: CreateMovieDto) {
    const checkMovie = await this.movieDetailRepository.findOne({
      title: createMovieDto.title,
    });

    if (checkMovie) {
      return 'movie already exist';
    }

    const newMovieDetails = this.movieDetailRepository.create({
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

    newMovieDetails.casts = casts;

    const videos = [];

    for (const video of createMovieDto.videos) {
      const { name, videoPath } = video;

      const newVideo = this.videoRepository.create({ name, videoPath });

      await this.videoRepository.save(newVideo);

      videos.push(newVideo);
    }

    newMovieDetails.videos = videos;
    await this.movieDetailRepository.save(newMovieDetails);

    const genres = [];
    for (const genre of createMovieDto.genres) {
      genres.push(genre);
      const checkGenre = await this.genreRepository.findOne({
        name: genre,
      });

      const newGenre = this.genreRepository.create({ name: genre });

      if (checkGenre) {
        await getConnection()
          .createQueryBuilder()
          .relation(Genre, 'movies')
          .of(checkGenre)
          .add(newMovieDetails);
      } else {
        newGenre.movies = [newMovieDetails];
        await this.genreRepository.save(newGenre);
      }
    }
    const strGenres = genres.join('|');
    const newMovie = this.movieRepository.create({
      title: createMovieDto.title,
      genres: strGenres,
    });

    newMovie.movieDetails = newMovieDetails;

    await this.movieRepository.save(newMovie);

    return 'done';
  }

  async setRatingMovie(rateMovieDto: RateMovieDto, user: any) {
    const { movie: movieId, rating } = rateMovieDto;
    const { userId } = user;

    const checkMovie = await this.movieDetailRepository.findOne({
      id: movieId,
    });
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
    const movie = await this.movieDetailRepository.findOne({ id });

    if (!id) {
      return 'movie is not exist';
    }

    await this.movieDetailRepository.remove(movie);

    return 'done';
  }
}
