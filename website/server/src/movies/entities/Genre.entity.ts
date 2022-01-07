import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MovieDetails } from './MovieDetails.entity';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'genre_id',
  })
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => MovieDetails, (movie) => movie.genres)
  movies: MovieDetails[];
}
