import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategorySchema } from './categories/model/schemas/category.schema';
import { PlayerSchema } from './players/model/schemas/player.schema';
import { CategoriesModule } from './categories/categories.module';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://admin:stdB8ZNGcUUc3nyE@cluster0.8e7qb.mongodb.net/sradmbackend?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }),
    MongooseModule.forFeature([
      { name: 'Category', schema: CategorySchema },
      { name: 'Player', schema: PlayerSchema }
    ]),
    CategoriesModule,
    PlayersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
