import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';

@Controller("/user")
export class UserController {
  constructor(private readonly appService: UserService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  postHello(@Req() req: Request): any {
    return req.body;
  }

}
