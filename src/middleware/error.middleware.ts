import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ErrorMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    try {
      next();
    } catch (error) {
      this.logger.error(`Error occurred: ${error.message}`);
      if (error instanceof HttpException) {
        res.status(error.getStatus()).json({
          statusCode: error.getStatus(),
          message: error.message,
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
        });
      }
    }
  }
}