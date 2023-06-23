import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import 'dotenv/config'
import { CORS } from './constants/cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.enableCors(CORS);
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('BIUX API')
    .setDescription('Aplicacion backend')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  
  await app.listen(process.env.PORT || 3335);
  console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();
