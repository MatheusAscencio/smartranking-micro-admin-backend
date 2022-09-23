import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from './model/interfaces/category.interface';

@Controller('categories')
export class CategoriesController {

    constructor(private service: CategoriesService) {}

    private logger: Logger = new Logger(CategoriesController.name);

    @EventPattern("create-category")
    public async create(@Payload() category: Category, @Ctx() context: RmqContext) {

    }


    @MessagePattern("consult-category")
    public async consult(@Payload() name: string, @Ctx() context: RmqContext) {

        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        try {
            if(name) {
                return await this.service.consult(name);
            } else {
                return await this.service.list();
            }
        } finally {
            await channel.ack(originalMsg);
        }
    }


    @EventPattern("update-category")
    public async update(@Payload() data: Category, @Ctx() context: RmqContext): Promise<void> {

        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        try {
            await this.service.update(data);
            await channel.ack(originalMsg);
        } catch(error) {

            const filterAckErrors = AckErrors.filter(AckError => error.message.includes(AckError));

            if(filterAckErrors) {
                await channel.ack(originalMsg);
            }
        }
    }


    @EventPattern("delete-category")
    public async delete(@Payload() name: string, @Ctx() context: RmqContext): Promise<void> {
        
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        try {
            await this.service.delete(name);
            await channel.ack(originalMsg);
        } catch(error) {
            const 
        }
    }
}