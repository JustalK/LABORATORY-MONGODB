import { Module } from '@nestjs/common';
import { Experience1Controller } from './experience1.controller';
import { Experience1Service } from './experience1.service';
import { FileModel } from './models/file.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'fs.files', schema: FileModel }])
  ],
  controllers: [Experience1Controller],
  providers: [Experience1Service],
})
export class Experience1Module {}
