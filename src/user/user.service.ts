import { Injectable } from '@nestjs/common';
import { User } from '../schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.modelName) private readonly userModel: Model<typeof User>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
  async createUser(data: any): Promise<any> {
    return this.userModel.create(data);
  }
  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
