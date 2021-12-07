import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsModule } from './films/films.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'db',
    port: 3306,
    username: 'root',
    password: 'root12345678',
    database: 'test',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
  }), FilmsModule],
})
export class AppModule {}
