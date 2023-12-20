import { HttpStatus } from '@nestjs/common';

export const ErrorDescriber = {
  [HttpStatus.OK]: `Not an error; returned on success`,
  [HttpStatus.BAD_REQUEST]: `Client specified an invalid argument.  Note that this differs
     from FAILED_PRECONDITION.  INVALID_ARGUMENT indicates arguments
     that are problematic regardless of the state of the system
     (e.g., a malformed file name).`,
  [HttpStatus.NOT_FOUND]: `Some requested entity (e.g., file or directory) was not found.`,
  [HttpStatus.FORBIDDEN]: `Some entity that we attempted to create (e.g., file or directory)
       already exists.`,
};

export const isHttpErrorMessage = (message: string, code: string) =>
  message === `Request failed with status code ${code}`;
