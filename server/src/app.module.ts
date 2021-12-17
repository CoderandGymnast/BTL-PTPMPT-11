import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      // for local
      // host: 'localhost',
      // username: 'root',
      // password: '3112',
      // for docker
      host: 'database',
      username: 'root',
      password: 'root123',
      database: 'movies',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
