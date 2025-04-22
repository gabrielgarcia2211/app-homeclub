import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import multipart from '@fastify/multipart';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.register(multipart, {
    limits: {
      fileSize: 50 * 1024 * 1024, // 50 MB, ajusta según sea necesario
    },
  });

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Apartamentos')
    .setDescription('Gestión de apartamentos y tarifas')
    .setVersion('1.0')
    .addTag('apartamentos')
    .addTag('tarifas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Habilitar validación global para toda la app
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en DTO
      forbidNonWhitelisted: true, // Lanza un error si hay propiedades no válidas
      transform: true, // Transforma los tipos automáticamente
    }),
  );
  // Inicia el servidor
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
