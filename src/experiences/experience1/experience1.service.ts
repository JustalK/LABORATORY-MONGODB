import { Model, Connection, mongo } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Data, DataDocument } from './../../schemas/data.schema';
import { MongoGridFS } from 'mongo-gridfs';
import mongodb, { GridFSBucket, ObjectId } from 'mongodb'
import fs from 'fs'

@Injectable()
export class Experience1Service {
  private readonly bucket: GridFSBucket;

  constructor(
    @InjectModel('fs.files') private readonly fileModel: Model<File>,
    @InjectConnection() private readonly connection: Connection
  ) {
    this.bucket = new mongo.GridFSBucket(this.connection as any)
    console.log(this.bucket)
  }

  async writeFile(file, metadata?) {

    fs.createReadStream('./files/img.png').
      pipe(bucket.openUploadStream('img.png')).
      on('error', function(error) {
        assert.ifError(error);
      }).
      on('finish', function() {
        console.log('done!');
        process.exit(0);
      });
  }
}
