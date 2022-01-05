import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      username: 'root',
      // for local
      // host: 'localhost',
      // password: '3112',
      // for docker
      host: 'sql',
      password: '12345678',
      database: 'movies',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MoviesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
