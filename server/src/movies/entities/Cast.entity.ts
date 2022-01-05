import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MovieDetails } from './MovieDetails.entity';

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

  @ManyToOne(() => MovieDetails, (movie) => movie.casts, {
    onDelete: 'CASCADE',
  })
  movie: MovieDetails[];
}
