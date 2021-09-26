import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CommandModule } from 'nestjs-command';
import { SeedsModule } from './seeds/data.module'

import Experience0Module from './experiences/experience0/experience.module';
import { Experience1Module } from './experiences/experience1/experience1.module';
import Experience2Module from './experiences/experience2/experience.module';

@Module({
  imports: [
    SeedsModule,
    Experience0Module,
    Experience1Module,
    Experience2Module,
    CommandModule,
    MongooseModule.forRoot('mongodb://localhost:27017',
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
