import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/User.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const checkUser = await this.userRepository.findOne({
      username: createUserDto.username,
    });

    if (checkUser) return null;

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);

    return user;
  }

  async findOne(username: string) {
    const checkUser = this.userRepository.findOne({ username });
    return checkUser;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };

    return {
      name: user.name,
      access_token: this.jwtService.sign(payload),
    };
  }
}
