import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/User.entity';
import { MoviesController } from './controller/movies/movies.controller';
import { Cast } from './entities/Cast.entity';
import { Genre } from './entities/Genre.entity';
import { Movie } from './entities/Movie.entity';
import { Rating } from './entities/Rating.entity';
import { Video } from './entities/Video.entity';
import { MoviesService } from './services/movies/movies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie, Genre, Cast, Video, Rating, User]),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
