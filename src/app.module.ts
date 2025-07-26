import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { InspectionsModule } from './inspections/inspections.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ErrorMiddleware } from './middleware/error.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';


@Module({
  imports: [InspectionsModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(ErrorMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}