import { User } from 'src/users/entities/User.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { MovieDetails } from './MovieDetails.entity';

@Entity({ name: 'ratings' })
export class Rating {
  @ManyToOne(() => User, (user) => user.ratings, { primary: true })
  @JoinColumn({ name: 'userId' })
  public user: User;

  @ManyToOne(() => MovieDetails, (movie) => movie.ratings, { primary: true })
  @JoinColumn({ name: 'movieId' })
  public movie: MovieDetails;

  @Column({
    default: 0,
  })
  rating: number;

  @CreateDateColumn({ type: 'timestamp' })
  timestamp: Date;
}
