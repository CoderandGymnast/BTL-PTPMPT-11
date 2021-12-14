import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Genre } from './Genre.entity';

@Entity()
export class Movie {
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
    name: 'poster-path',
  })
  posterPath: string;

  @Column({
    name: 'backdrop_path',
  })
  backdropPath: string;

  @ManyToMany(() => Genre, (genre) => genre.movies)
  @JoinTable({
    name: 'movies_genres',
  })
  genres: Genre[];

  //   limit: string;
}
