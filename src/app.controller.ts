import { Controller, Logger } from '@nestjs/common';
import { Payload, EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Category } from './interfaces/categories/category.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger: Logger = new Logger(AppController.name);

  @EventPattern('create-category')
  async createCategory(@Payload() category: Category) {
    this.logger.log(`Category: ${ JSON.stringify(category) }`)
    await this.appService.createCategory(category);
  }

  @MessagePattern('consult-category')
  async consultCategory(@Payload() id: string) {
    
    this.logger.log(`Category: ${ JSON.stringify(id) }`)
    
    if (id) {
      return await this.appService.consultCategory(id);
    } else {
      return await this.appService.consultCategories();
    }  
  }
}
