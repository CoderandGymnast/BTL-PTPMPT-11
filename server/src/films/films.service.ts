import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Film } from './film.entity';

@Injectable()
export class FilmsService extends TypeOrmCrudService<Film>{
    constructor(@InjectRepository(Film) repo){
        super(repo)
    }
}
