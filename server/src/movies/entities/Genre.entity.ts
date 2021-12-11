import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Movie } from './Movie.entity';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'genre_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @ManyToMany(() => Movie, (movie) => movie.genres)
  movies: Movie[];
}
