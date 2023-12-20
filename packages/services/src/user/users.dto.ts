import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Should be a valid email',
  })
  email: string;

  @ApiProperty({ type: 'string', required: true })
  password: string;
}
