import { Model, Connection, mongo } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Data, DataDocument } from './../../schemas/data.schema';
import { MongoGridFS } from 'mongo-gridfs';
import { GridFSBucket, ObjectId } from 'mongodb'
import fs from 'fs'

@Injectable()
export class Experience1Service {
  private bucket: MongoGridFS;
  private isConnected: boolean;

  constructor(
    @InjectModel('images.files') private readonly fileModel: Model<File>,
    @InjectConnection() private readonly connection: Connection
  ) {
    // Be sure the connection has been made
    this.connection.once("open", () => {
      this.bucket = new MongoGridFS(this.connection.db, 'images');
      this.isConnected = true;
    });
  }

  infoFile(id) {
    return this.fileModel.find({});
  }

  writeFile(file, metadata?) {
    if (this.isConnected) {
      return this.bucket.uploadFile(
        file.path,
        {
          filename: file.originalname,
          contentType: file.mimetype,
          metadata,
        },
        true,
      );
    }
  }

}
