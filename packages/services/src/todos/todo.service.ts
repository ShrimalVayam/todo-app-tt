import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateNewTodoDto } from './todo.types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from 'src/schemas/todo.schema';
import TodoHttpException from 'src/utils/TodoHttpException';
import { IAuthUser } from 'src/utils/common.interface';

@Injectable()
export class TodoService {
  private readonly logger = new Logger();
  constructor(
    @InjectModel(Todo.name)
    private todoModel: Model<TodoDocument>,
  ) {}

  async getAllMyTodos(user: IAuthUser) {
    this.logger.log('Getting my todos');
    try {
      return await this.todoModel
        .find({
          userId: user.userId,
        })
        .lean();
    } catch (error) {
      throw new TodoHttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error getting todos ${error?.message}`,
      });
    }
  }

  async deleteTodo(user: IAuthUser, todoId: string) {
    this.logger.log('Deleting my todos');
    console.log('444545', { user, todoId });
    try {
      return await this.todoModel.findByIdAndDelete(todoId);
    } catch (error) {
      throw new TodoHttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error getting todos ${error?.message}`,
      });
    }
  }

  async createTodo(newTodo: CreateNewTodoDto) {
    try {
      this.logger.log(`Creating the todo`);
      return await this.todoModel.create({
        ...newTodo,
      });
    } catch (error) {
      throw new TodoHttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error creating todo ${error?.message}`,
      });
    }
  }
}
