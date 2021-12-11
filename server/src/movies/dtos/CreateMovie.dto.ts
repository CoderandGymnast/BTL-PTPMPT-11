import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsNotEmpty()
  genres: string;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  casts: string;

  @ApiProperty()
  @IsNotEmpty()
  posterUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  thumbnailUrl: string;
}
