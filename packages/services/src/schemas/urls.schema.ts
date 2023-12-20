import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UrlsDocument = Urls & Document;

@Schema({ timestamps: true })
export class Urls {
  @Prop({ required: true })
  url: string;
}

export const UrlSchema = SchemaFactory.createForClass(Urls);
