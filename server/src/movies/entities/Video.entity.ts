import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MovieDetails } from './MovieDetails.entity';

@Entity()
export class Video {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'video_id',
  })
  id: number;

  @Column()
  name: string;

  @Column({
    name: 'video_path',
  })
  videoPath: string;

  @ManyToOne(() => MovieDetails, (movie) => movie.videos, {
    onDelete: 'CASCADE',
  })
  movie: MovieDetails;
}
