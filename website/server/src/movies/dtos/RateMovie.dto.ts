import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RateMovieDto {
  @ApiProperty()
  @IsNotEmpty()
  movie: number;

  @ApiProperty()
  @IsNotEmpty()
  rating: number;
}
