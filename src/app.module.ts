import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategorySchema } from './schemas/category.schema';
import { PlayerSchema } from './schemas/player.schema';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://admin:stdB8ZNGcUUc3nyE@cluster0.8e7qb.mongodb.net/sradmbackend?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }),
    MongooseModule.forFeature([
      { name: 'Category', schema: CategorySchema },
      { name: 'Player', schema: PlayerSchema }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
