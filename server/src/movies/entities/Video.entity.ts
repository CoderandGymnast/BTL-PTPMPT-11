import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Movie } from './Movie.entity';

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

  @ManyToOne(() => Movie, (movie) => movie.videos, { onDelete: 'CASCADE' })
  movie: Movie;
}
