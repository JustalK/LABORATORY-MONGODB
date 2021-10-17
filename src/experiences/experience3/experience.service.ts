import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Data, DataDocument } from './../../schemas/data.schema';

@Injectable()
export class ExperienceService {
  constructor(@InjectModel(Data.name) private dataModel: Model<DataDocument>) {}

  getHello(): Promise<Data[]> {
    return this.dataModel.find().explain('executionStats').exec();
  }

  getHelloAggregate(): Promise<Data[]> {
    return this.dataModel
      .aggregate([
        {
          $limit: 1,
        },
      ])
      .exec();
  }
}
