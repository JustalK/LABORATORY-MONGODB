import { Model, Connection, mongo } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Data, DataDocument } from './../../schemas/data.schema';
import { MongoGridFS } from 'mongo-gridfs';
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

  /**
  * Return the stream of the item
  **/
  readStream(id, res) {
    return this.bucket.readFileStream(id).then((item) => {
      item.once("error", () => {
          return res.status(400).end();
      }).pipe(res);
    })
  }

  /**
  * Read the info save for the file
  **/
  infoFile(id) {
    return this.bucket.findById(id);
  }

  /**
  * Write a chunk in the database using the bucket
  **/
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
