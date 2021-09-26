import { Controller, Get, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Experience1Service } from './experience1.service';
import { Data } from './../../schemas/data.schema';
import { Express } from 'express';

@Controller('experience1')
export class Experience1Controller {
  constructor(private readonly appService: Experience1Service) {}

  @Get()
  @UseInterceptors(FileInterceptor('file', {dest: 'uploads'}))
  writeFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.appService.writeFile(file);
  }
}
