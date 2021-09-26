import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Data, DataDocument } from './../../schemas/data.schema';

@Injectable()
export class ExperienceService {
  constructor(@InjectModel(Data.name) private dataModel: Model<DataDocument>) {}

  async manageCursor(): Promise<any[]> {
    const myCursor = await this.dataModel.find().cursor();
    let rsl = [];

    // Pass over all the data with a cursor
    let element;
    while(element = await myCursor.next()) {
      rsl.push(element.name)
    }

    return rsl;
  }
}
