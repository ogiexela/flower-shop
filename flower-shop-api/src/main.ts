import * as morgan from 'morgan';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('combined'));

  const options = new DocumentBuilder()
    .setTitle('Flower Shop API')
    .setDescription('Rest API for Flower Shop')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger-ui', app, document);

  await app.listen(3000);
}
bootstrap();
