import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { SeedsService } from './data.service';
import { Data, DataSchema } from './../schemas/data.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CommandModule,
    MongooseModule.forFeature([{ name: Data.name, schema: DataSchema }]),
  ],
  providers: [SeedsService],
  exports: [SeedsService],
})
export class SeedsModule {}
