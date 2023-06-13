import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
      forbidUnknownValues: true,
    }),
  );
    const config = new DocumentBuilder()
    .setTitle('BIUX')
    .setDescription('API')
    .setVersion('1.0')
    .addTag('')
    .build();

    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  
  await app.listen(process.env.PORT);
  console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();
