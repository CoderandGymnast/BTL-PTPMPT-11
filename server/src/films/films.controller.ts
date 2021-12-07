import { Controller, Get } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { get, request } from 'http';
import { Film } from './film.entity';
import { FilmsService } from './films.service';
@Crud(
    {
        model:{
            type:Film
        }
    }
)
@Controller('films')
export class FilmsController implements CrudController<Film>{
    constructor(public service: FilmsService){}
}
