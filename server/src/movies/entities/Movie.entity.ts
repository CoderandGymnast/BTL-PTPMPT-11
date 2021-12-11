import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cast } from './Cast.entity';
import { Genre } from './Genre.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'movie_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  title: string;

  @Column({
    nullable: false,
    default: '',
  })
  description: string;

  @Column({
    name: 'poster-img',
    nullable: false,
    default: '',
  })
  posterUrl: string;

  @Column({
    name: 'thumbnail-img',
    nullable: false,
    default: '',
  })
  thumbnailUrl: string;

  @ManyToMany(() => Genre, (genre) => genre.movies)
  @JoinTable()
  genres: Genre[];

  @ManyToMany(() => Cast, (cast) => cast.movies)
  @JoinTable()
  casts: Cast[];

  //   time: string;

  //   limit: string;
}
