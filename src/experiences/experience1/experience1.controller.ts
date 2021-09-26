import { Controller, Get, UploadedFile, UseInterceptors, Param, Res, Response } from '@nestjs/common';
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
    return this.appService.writeFile(file);
  }

  @Get('info/:id')
  infoFile(@Param() params) {
    return this.appService.infoFile(params.id);
  }

  @Get('read/:id')
  readStream(@Param() params, @Res() res: Response) {
    return this.appService.readStream(params.id, res);
  }
}
