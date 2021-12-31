import { User } from 'src/users/entities/User.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Movie } from './Movie.entity';

@Entity()
export class Rating {
  //   @CreateDateColumn({ type: 'timestamp' })
  //   createdAt: Date;

  //   @UpdateDateColumn({ type: 'timestamp' })
  //   updatedAt: Date;

  @ManyToOne(() => User, (user) => user.ratings, { primary: true })
  public user: User;

  @ManyToOne(() => Movie, (movie) => movie.ratings, { primary: true })
  public movie: Movie;

  @Column({
    default: 0,
  })
  rating: number;
}
