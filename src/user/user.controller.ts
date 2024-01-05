import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { Public } from '../config/metadata';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  async signup(@Body() body: any) {
    const result = await this.userService.createUser(body);
    return result;
  }

  @Public()
  @Post('login')
  async login(@Body() body: any) {
    const user: any = await this.userService.getUserByEmail(body.email);
    if (user?.password !== body.password) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: 'user._id',
      username: 'user.email',
      iat: Date.now() / 1000,
    };
    return {
      user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
