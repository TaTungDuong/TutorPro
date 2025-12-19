import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const isHttp = exception instanceof HttpException;
    const status = isHttp ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const payload = isHttp ? exception.getResponse() : { message: 'Internal server error' };
    const message =
      typeof payload === 'string'
        ? payload
        : (payload as any).message ?? (payload as any).error ?? 'Error';

    res.status(status).json({
      statusCode: status,
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
      message,
    });
  }
}
