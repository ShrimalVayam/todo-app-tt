import {
  Controller,
  Get,
  HttpCode,
  Param,
  HttpStatus,
  Logger,
  Post,
  Body,
  UseGuards,
  Version,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { JoiValidationPipe } from 'src/utils/joiValidation.pipe';
import { TodoService } from './todo.service';
import {
  CreateTodoDto,
  DeleteURLParam,
  ICreateCoreBodyDto,
} from './todo.types';
import { createTodoValidation } from './todo.joi';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/utils/req-logistics';
import { IAuthUser } from 'src/utils/common.interface';

@Controller('')
export class TodoController {
  private readonly logger = new Logger();
  constructor(private todoService: TodoService) {}

  @HttpCode(HttpStatus.OK)
  @Version(['v1'])
  @Get('/todos')
  @ApiOperation({ summary: 'Gets all my todos' })
  @UseGuards(JwtAuthGuard)
  async getMyTodos(@User() user: IAuthUser) {
    return await this.todoService.getAllMyTodos(user);
  }

  @HttpCode(HttpStatus.OK)
  @Version(['v1'])
  @Delete('/todos/:todoId')
  @ApiOperation({ summary: 'Gets all my todos' })
  @UseGuards(JwtAuthGuard)
  async deleteMyTodo(
    @User() user: IAuthUser,
    @Param('todoId') todoId: DeleteURLParam,
  ) {
    return await this.todoService.deleteTodo(user, todoId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Version(['v1'])
  @Post('/todos/create')
  @ApiOperation({ summary: 'Creates a new todo with a description' })
  @ApiBody({
    type: CreateTodoDto,
  })
  @UseGuards(JwtAuthGuard)
  async createURL(
    @Body(new JoiValidationPipe(createTodoValidation)) body: ICreateCoreBodyDto,
    @User() user: IAuthUser,
  ) {
    return await this.todoService.createTodo({ ...body, userId: user.userId });
  }
}
