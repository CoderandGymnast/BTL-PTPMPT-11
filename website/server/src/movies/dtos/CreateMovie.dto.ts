import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  runtime: number;

  @ApiProperty()
  @IsNotEmpty()
  posterPath: string;

  @ApiProperty()
  @IsNotEmpty()
  backdropPath: string;

  @ApiProperty()
  @IsNotEmpty()
  casts: [];

  @ApiProperty()
  @IsNotEmpty()
  videos: [];

  @ApiProperty()
  @IsNotEmpty()
  genres: [];
}
