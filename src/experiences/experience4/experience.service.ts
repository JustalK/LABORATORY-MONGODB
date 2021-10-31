import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Data, DataDocument } from './../../schemas/data.schema';

@Injectable()
export class ExperienceService {
  constructor(@InjectModel(Data.name) private dataModel: Model<DataDocument>) {}

  // Only with version 4.2
  convertDate(): Promise<Data[]> {
    return this.dataModel
      .aggregate([
        {
          $addFields: {
            convertedDate: { $toDate: '$date' },
          },
        },
        {
          $match: {
            date: { $lte: '$$NOW' },
          },
        },
      ])
      .exec();
  }
}
