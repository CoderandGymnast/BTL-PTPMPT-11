import { Controller, Get } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { get, request } from 'http';
import { Film } from './user.entity';
import { UsersService } from './users.service';
@Crud(
    {
        model:{
            type:Film
        }
    }
)
@Controller('films')
export class UsersController implements CrudController<Film>{
    constructor(public service: UsersService){}
}
