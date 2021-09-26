import { Controller, Get } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { Data } from './../../schemas/data.schema';

@Controller('experience2')
export class ExperienceController {
  constructor(private readonly appService: ExperienceService) {}

  @Get()
  manageCursor(): Promise<any[]> {
    return this.appService.manageCursor();
  }
}
