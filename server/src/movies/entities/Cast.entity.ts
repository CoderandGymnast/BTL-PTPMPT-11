import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Movie } from './Movie.entity';

@Entity()
export class Cast {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'cast_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    name: 'cast-img',
  })
  castImgUrl: string;

  @ManyToMany(() => Movie, (movie) => movie.casts)
  movies: Movie[];
}
