import { Injectable } from '@nestjs/common';
import { User } from '../schema/user.schema';

@Injectable()
export class UserService {
  getHello(): string {
    return 'Hello World!';
  }
  async setData(data: any): Promise<any> {
    const newUser = new User(data)
    return await newUser.save();
  }
}
