import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { RpcException } from '@nestjs/microservices';
import { Model } from 'mongoose';
import { Category } from './interfaces/categories/category.interface';
import { Player } from './interfaces/players/player.interface';

@Injectable()
export class AppService {
  
  private readonly logger = new Logger(AppService.name) 

  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    @InjectModel('Player') private readonly playerModel: Model<Player>
  ) {}

  async createCategory(category: Category): Promise<Category> {
    try {
      const cate = new this.categoryModel(category);
      return await cate.save()
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message) 
    }
  }

  async consultCategory(id: string): Promise<Category> {
    try {
      return await this.categoryModel.findOne({ id }).exec();
    } catch (error) {
      this.logger.error(`error: ${ JSON.stringify(error.message) }`);
      throw new RpcException(error.message)
    }
  }

  async consultCategories(): Promise<Category[]> {
    try {
      return await this.categoryModel.find().exec();
    } catch (error) {
      this.logger.error(`error: ${ JSON.stringify(error.message) }`);
      throw new RpcException(error.message)
    }
  }
}
