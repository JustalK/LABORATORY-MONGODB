import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CommandModule } from 'nestjs-command';
import { SeedsModule } from './seeds/data.module'

import { Experience0Module } from './experiences/experience0/experience0.module';

@Module({
  imports: [
    Experience0Module,
    SeedsModule,
    CommandModule,
    MongooseModule.forRoot('mongodb://root:smood2mongo@localhost:27017/admin'),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
