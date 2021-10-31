import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DataDocument = Data & Document;

@Schema()
export class Data {
  @Prop()
  name: string;
  @Prop()
  date: Date;
}

export const DataSchema = SchemaFactory.createForClass(Data);
