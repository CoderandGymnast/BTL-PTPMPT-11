import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cast } from './Cast.entity';
import { Genre } from './Genre.entity';
import { Rating } from './Rating.entity';
import { Video } from './Video.entity';

@Entity({ name: 'movies_details' })
export class MovieDetails {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'movie_id',
  })
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'longtext',
  })
  description: string;

  @Column()
  runtime: number;

  @Column({
    name: 'poster_path',
  })
  posterPath: string;

  @Column({
    name: 'backdrop_path',
  })
  backdropPath: string;

  @OneToMany(() => Video, (video) => video.movie)
  videos: Video[];

  @OneToMany(() => Cast, (cast) => cast.movie)
  casts: Cast[];

  @ManyToMany(() => Genre, (genre) => genre.movies)
  @JoinTable({
    name: 'movies_genres',
  })
  genres: Genre[];

  @OneToMany(() => Rating, (rating) => rating.movie)
  public ratings: Rating[];
}
