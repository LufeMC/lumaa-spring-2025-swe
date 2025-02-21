import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: UserDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: UserDto) {
    return this.authService.login(loginDto);
  }
}
