import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';

@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }
  @Post()
  async postHello(@Req() req: Request) {
    const result = await this.userService.setData(req.body)
    return result;
  }
}
