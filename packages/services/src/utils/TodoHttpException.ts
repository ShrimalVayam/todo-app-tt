import { Logger, HttpStatus, HttpException } from '@nestjs/common';
import { isHttpErrorMessage } from './CustomErrorDesc';

type ErrorObject = {
  code: HttpStatus;
  message: string;
  status?: string;
};

class TodoHttpException extends HttpException {
  public instance: Error;
  private readonly customError: Partial<ErrorObject> = {};

  constructor(error: ErrorObject, instance?: Error) {
    super(error, error.code);

    this.instance = instance;
    this.customError = error;

    /**
     * Guess what happened with http service call
     */
    if (isHttpErrorMessage(instance?.message || error.message, '404')) {
      this.customError.code = HttpStatus.NOT_FOUND;
      this.customError.message = 'NotFound';
    } else if (isHttpErrorMessage(instance?.message || error.message, '409')) {
      this.customError.code = HttpStatus.FORBIDDEN;
      this.customError.message = 'AlreadyExists';
    }
    Logger.error('🛑🛑🛑 ️ Todo Server Exception:');
    Logger.error(this);
  }

  getError() {
    return this.customError;
  }
}

export default TodoHttpException;
