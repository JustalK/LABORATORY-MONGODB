import { Controller, Get } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { Data } from './../../schemas/data.schema';

@Controller('experience0')
export class ExperienceController {
  constructor(private readonly appService: ExperienceService) {}

  @Get()
  getHello(): Promise<Data[]> {
    return this.appService.getHello();
  }
}
