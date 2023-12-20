import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true })
export class Todo {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  userId: User;

  @Prop({ required: true })
  description: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
