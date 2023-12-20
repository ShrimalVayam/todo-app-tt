import { ApiProperty } from '@nestjs/swagger';
export type DeleteURLParam = string;

export interface ICreateCoreBodyDto {
  description: string;
}

export interface CreateNewTodoDto extends ICreateCoreBodyDto {
  userId: string;
}

export class CreateTodoDto {
  @ApiProperty({ type: 'string' })
  description: string;
}
