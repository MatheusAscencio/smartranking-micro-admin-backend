import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from './model/interfaces/player.interface';
import { RpcException } from '@nestjs/microservices';
import { PlayerDTO } from '../../../smartranking-api-gateway/src/players/model/DTOs/player.dto';

@Injectable()
export class PlayersService {

    constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) {}

    private logger: Logger = new Logger(PlayersService.name);

    public async create(player: Player): Promise<void> {
        
        try {
            const p = new this.playerModel(player);
            await p.save();
        } catch(error) {
            this.logger.error(`Error: ${ JSON.stringify(error.message) }`);
            throw new RpcException(error.message);
        }
    }

    
    public async consult(email: string): Promise<Player> {
        
        try {
            return await this.playerModel.findOne({ email }).populate("category").exec();
        } catch(error) {
            this.logger.error(`Error: ${JSON.stringify(error.message)}`)
            throw new RpcException(error.message);
        }
    }


    public async list(): Promise<Array<Player>> {
        
        try{
            return await this.playerModel.find().populate("category").exec() 
        } catch(error) {
            this.logger.error(`Error: ${JSON.stringify(error.message)}`);
            throw new RpcException(error.message);
        }
    }


    public async update(dto: PlayerDTO): Promise<void> {
        
        try {
            const { email } = dto;
            await this.playerModel.findOneAndUpdate({ email }, { $set: dto }).populate("category").exec();
        } catch(error) {
            this.logger.error(`Error: ${ JSON.stringify(error.message) }`);
            throw new RpcException(error.message);
        }
    }


    public async delete(email: string): Promise<void> {
        
        try {
            await this.playerModel.findOneAndDelete({ email });
        } catch(error) {
            this.logger.error(`Error: ${ JSON.stringify(error.message) }`);
            throw new RpcException(error.message);
        }
    }
}
