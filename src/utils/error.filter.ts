// src/common/filters/error.filter.ts

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalErrorFilter implements ExceptionFilter {

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500
    if (exception instanceof BadRequestException) {
      status = HttpStatus.BAD_REQUEST
      return response.status(status).json({
        code: status,
        message: exception.message || 'Internal server error'
      });
    }

    response.status(status).json({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message || 'Internal server error'
    });
  }
}
