import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MongooseError, mongo } from 'mongoose';

@Catch()
export class GlobalErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof BadRequestException) {
      return responseWithError(
        response,
        HttpStatus.BAD_REQUEST,
        exception.message,
      );
    }

    if (exception instanceof mongo.MongoError) {
      switch (exception.code) {
        case 11000:
          const keyValue = (exception as any).keyValue;
          const errors = Object.keys(keyValue).map((field) => ({
            [field]: `${field.split('_').join(' ')} value already exist`,
          }));
          return responseWithError(response, HttpStatus.CONFLICT, errors);

        default:
          return responseWithError(
            response,
            HttpStatus.INTERNAL_SERVER_ERROR,
            exception.message,
          );
      }
    }
    if (exception instanceof MongooseError) {
      const errors = Object.keys((exception as any).errors).map((field) => ({
        [field]: `${field.split('_').join(' ')} is required`,
      }));
      return responseWithError(response, HttpStatus.CONFLICT, errors);
    }

    return responseWithError(
      response,
      HttpStatus.INTERNAL_SERVER_ERROR,
      exception.message,
    );
  }
}

const responseWithError = (response: Response, status: number, error: any) => {
  return response.status(status).json({ isError: true, error });
};
