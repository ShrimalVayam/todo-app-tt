import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({
    type: 'string',
    description: 'Should be a valid email',
  })
  username: string;

  @ApiProperty({ type: 'string' })
  password: string;
}
