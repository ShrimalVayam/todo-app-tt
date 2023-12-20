import {
  Controller,
  Post,
  Logger,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from 'src/utils/req-logistics';
import { UserLoginDto } from './auth.dto';

@Controller({ path: '/auth', version: ['v1'] })
export class AuthController {
  private readonly logger = new Logger();
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  @ApiBody({ type: UserLoginDto })
  @ApiOperation({ summary: 'Login API with username and password' })
  @UseGuards(LocalAuthGuard)
  async login(@User() user) {
    this.logger.log('User Validated. Logging in');
    return this.authService.login(user);
  }
}
