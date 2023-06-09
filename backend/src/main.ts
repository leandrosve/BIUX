import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


    const config = new DocumentBuilder()
    .setTitle('BIUX')
    .setDescription('API')
    .setVersion('1.0')
    .addTag('')
    .build();

    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  
  await app.listen(3333);
}
bootstrap();
