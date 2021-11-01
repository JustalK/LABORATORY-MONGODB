import { Controller, Get } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { Data } from './../../schemas/data.schema';

@Controller('experience4')
export class ExperienceController {
  constructor(private readonly appService: ExperienceService) {}

  @Get()
  getHello(): Promise<Data[]> {
    return this.appService.convertDate();
  }

  @Get('sub')
  sub(): Promise<Data[]> {
    return this.appService.substractDate();
  }
}
