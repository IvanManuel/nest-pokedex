import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    // Transforma los params automaticamente a las instancias del DTO
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  })
  );

  await app.listen( process.env.PORT || 3000 );
  console.log(`App running on port ${ process.env.PORT || 3000 }`);
}
bootstrap();
