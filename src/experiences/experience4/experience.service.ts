import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Data, DataDocument } from './../../schemas/data.schema';

@Injectable()
export class ExperienceService {
  constructor(@InjectModel(Data.name) private dataModel: Model<DataDocument>) {}

  // Search between two date
  rangeDate(): Promise<Data[]> {
    return this.dataModel
      .aggregate([
        {
          $match: {
            date: {
              $gte: new Date('2017-10-03'),
              $lte: new Date('2020-10-03'),
            },
          },
        },
      ])
      .exec();
  }

  // Remove/add time in millisecond to a date field
  substractDate(): Promise<Data[]> {
    return this.dataModel
      .aggregate([
        {
          $addFields: {
            convertedDate: { $toDate: '$date' },
          },
        },
        {
          $addFields: {
            addConvertedDate: {
              $add: ['$convertedDate', 24 * 60 * 60 * 1000], // 1 day
            },
            subConvertedDate: {
              $subtract: ['$convertedDate', 24 * 60 * 60 * 1000], //1 day less
            },
          },
        },
      ])
      .exec();
  }

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
