import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from 'src/schemas/todo.schema';
@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
