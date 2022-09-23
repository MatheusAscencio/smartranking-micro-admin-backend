import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './model/interfaces/category.interface';
import { RpcException } from '@nestjs/microservices';
import { CategoryDTO } from '../../../smartranking-api-gateway/src/categories/model/DTOs/category.dto';

@Injectable()
export class CategoriesService {

    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>,) {}

    private logger: Logger = new Logger(CategoriesService.name);

    public async create(category: Category): Promise<void> {
        try {
            const c = new this.categoryModel(category);
            await c.save();
        } catch(error) {
            this.logger.error(`Error: ${ JSON.stringify(error.message) }`);
            throw new RpcException(error.message)
        }
    }


    public async consult(name: string): Promise<Category> {
        try {
            return await this.categoryModel.findOne({ name }).exec();
          } catch (error) {
            this.logger.error(`error: ${ JSON.stringify(error.message) }`);
            throw new RpcException(error.message)
          }
    }


    public async list(): Promise<Array<Category>> {

        try {
            return await this.categoryModel.find().populate("players").exec();
        } catch(error) {
            this.logger.error(`Error: ${ JSON.stringify(error.message) }`);
            throw new RpcException(error.message);
        }
    }


    public async update(category: CategoryDTO): Promise<void> {
        
        try{
            await this.categoryModel.findOneAndUpdate({ category.category }, { $set: category}).exec();
        } catch(error) {
            this.logger.error(`Error: ${ JSON.stringify(error.message) }`);
            throw new RpcException(error.message);
        }
    }


    public async delete(name: string): Promise<void> {
        
        try {
            await this.categoryModel.findOneAndDelete({ name }).exec();
        } catch(error) {
            this.logger.error(`Error: ${ JSON.stringify(error.message) }`);
            throw new RpcException(error.message);
        }
    }
}
