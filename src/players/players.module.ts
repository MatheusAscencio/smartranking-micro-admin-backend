import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerSchema } from './model/schemas/player.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: "Player", schema: PlayerSchema}
  ])],
  providers: [PlayersService],
  controllers: [PlayersController]
})
export class PlayersModule {}
