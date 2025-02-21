import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/users.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: UserDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.userService.create({
      ...registerDto,
      password: hashedPassword,
    });
    return { user };
  }

  async login(loginDto: UserDto) {
    const user = await this.userService.findByUsername(loginDto.username);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
