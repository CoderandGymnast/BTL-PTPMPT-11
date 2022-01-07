import { Rating } from 'src/movies/entities/Rating.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => Rating, (rating) => rating.user)
  public ratings: Rating[];
}
