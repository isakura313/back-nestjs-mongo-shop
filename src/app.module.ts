import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestController } from './controller/quest/quest.controller';
import { QuestSchema } from './schema/quest.schema';
import { QuestService } from './quest/quest.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'questdb',
    }),
    MongooseModule.forFeature([{ name: 'Quest', schema: QuestSchema }]),
    AuthModule,
  ],
  controllers: [AppController, QuestController],
  providers: [AppService, QuestService],
})
export class AppModule {}
