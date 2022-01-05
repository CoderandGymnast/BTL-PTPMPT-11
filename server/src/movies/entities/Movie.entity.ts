import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { MovieDetails } from './MovieDetails.entity';

@Entity({ name: 'movies' })
export class Movie {
  @OneToOne(() => MovieDetails, { primary: true })
  @JoinColumn({ name: 'movieId' })
  movieDetails: MovieDetails;

  @Column()
  title: string;

  @Column()
  genres: string;
}
