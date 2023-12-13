import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }
  @Post('signup')
  async signup(@Body() body: any) {
    const result = await this.userService.createUser(body);
    return result;
  }
}
