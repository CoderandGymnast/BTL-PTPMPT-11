import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Movie } from './Movie.entity';

@Entity()
export class Cast {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'cast_id',
  })
  id: number;

  @Column()
  name: string;

  @Column({
    name: 'profile_path',
  })
  profilePath: string;

  @ManyToOne(() => Movie, (movie) => movie.casts, { onDelete: 'CASCADE' })
  movie: Movie[];
}
