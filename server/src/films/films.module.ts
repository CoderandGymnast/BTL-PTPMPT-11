import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Film } from './film.entity';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

@Module({
  imports:[TypeOrmModule.forFeature([Film])],
  controllers: [FilmsController],
  providers: [FilmsService]
})
export class FilmsModule {}
