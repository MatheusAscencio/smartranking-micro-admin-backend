import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { Player } from './model/interfaces/player.interface';
import { PlayersService } from './players.service';
import { PlayerDTO } from '../../../smartranking-api-gateway/src/players/model/DTOs/player.dto';
import { CustomValidationPipe2 } from './pipes/custom-validation.pipe';

const AckErrors: Array<string> = ["E11000"]

@Controller('players')
export class PlayersController {

    constructor(private service: PlayersService) {}

    private logger: Logger = new Logger(PlayersController.name);

    @EventPattern("create-player")
    public async create(@Payload() player: Player, @Ctx() context: RmqContext): Promise<void> {
        
        this.logger.log("Create Player API Accessed!");
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        try {
            await this.service.create(player);
            await channel.ack(originalMsg);
        } catch(error) {
            this.logger.error(`Error: ${ JSON.stringify(error.message) }`);

            const filterAckErrors = AckErrors.filter(AckError => error.message.includes(AckError));

            if(filterAckErrors) {
                await channel.ack(originalMsg);
            }
        }
    }


    @MessagePattern("consult-player")
    public async consult(@Payload() email: string, @Ctx() context: RmqContext): Promise<Player | Array<Player>> {

        this.logger.log("Consult Player API Accessed!");
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        try {
            if(email) {
                return await this.service.consult(email);
            } else {
                return await this.service.list();
            }
        } finally {
            await channel.ack(originalMsg);
        }
    }


    @EventPattern("update-player")
    public async update(@Payload() player: PlayerDTO, @Ctx() context: RmqContext): Promise<void> {

        this.logger.log("Update Player API Accessed!")
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        try {
            await this.service.update(player);
            await channel.ack(originalMsg);
        } catch(error) {
            this.logger.error(`Error: ${ JSON.stringify(error.message) }`);

            const filterAckErrors = AckErrors.filter(AckError => error.message.includes(AckError));

            if(filterAckErrors) {
                await channel.ack(originalMsg);
            }
        }
    }


    @EventPattern("delete-player")
    public async delete(@Payload(CustomValidationPipe2) email: string, @Ctx() context: RmqContext): Promise<void> {

        this.logger.log("Delete Player API Accessed!");
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        try {
            await this.service.delete(email);
            await channel.ack(originalMsg);
        } catch(error) {
            this.logger.error(`Error: ${ JSON.stringify(error.message) }`);

            const filterAckErrors = AckErrors.filter(AckError => error.message.includes(AckError));

            if(filterAckErrors) {
                await channel.ack(originalMsg);
            }
        }
    }
}
