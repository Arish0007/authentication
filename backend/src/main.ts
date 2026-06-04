import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow the Next.js frontend (running on http://localhost:3000)
  // to call this backend. Without this you get a "CORS" error in the browser.
  app.enableCors();

  // The frontend talks to http://localhost:3001, so run the backend on port 3001.
  await app.listen(3001);
  console.log('Backend is running on http://localhost:3001');
}
bootstrap();
