import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { InternalServerErrorException, ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      abortOnError: false,
    });

    app.useGlobalPipes(new ValidationPipe({
      transform: true,
    }));
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    new InternalServerErrorException('Something went wrong');
  }

}
bootstrap();
