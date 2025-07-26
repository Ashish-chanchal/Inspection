import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Site Inspection API')
    .setDescription(
      'REST API for managing construction site inspection checklists. Provides endpoints to fetch, update, reset, and summarize inspection items for daily site inspections.',
    )
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Local Development')
    .addTag('inspections', 'Endpoints for managing inspection checklists')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tryItOutEnabled: true,
    },
  });

  await app.listen(3000);
}
bootstrap();