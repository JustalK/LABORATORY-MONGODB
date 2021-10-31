import { Command, Positional } from 'nestjs-command';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Data, DataDocument } from './../schemas/data.schema';

const faker = require('faker');

@Injectable()
export class SeedsService {
  constructor(@InjectModel(Data.name) private dataModel: Model<DataDocument>) {}

  @Command({ command: 'seeds', describe: 'Populate the database' })
  seed(data): Promise<Data[]> {
    this.dataModel.deleteMany().exec()
    const datas = Array.from({ length: 5 }).map((x) => {
      return new this.dataModel({
        name: faker.random.word(),
        date: Math.random() < 0.5 ? faker.date.future() : '2018-03-22',
      });
    });
    return this.dataModel.insertMany(datas);
  }
}
