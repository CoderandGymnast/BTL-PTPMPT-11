import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Film } from './user.entity';

@Injectable()
export class UsersService extends TypeOrmCrudService<Film>{
    constructor(@InjectRepository(Film) repo){
        super(repo)
    }
}
