import { HttpException, HttpStatus } from '@nestjs/common';

export const sendSuccess = (message: string, data?: any, statusCode: number = HttpStatus.OK) => {
  return {
    success: true,
    message,
    data,
    statusCode,
  };
};

export const sendError = (message: string = 'Something went wrong', statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR) => {
  throw new HttpException(
    { success: false, message },
    statusCode,
  );
};



export class AppError extends HttpException {
  constructor(
    message: string,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super({ success: false, message }, statusCode);
  }
}
