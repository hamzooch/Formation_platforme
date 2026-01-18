import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    credentials: true,
  });
  app.setGlobalPrefix("api");
  await app.listen(4000);
}

bootstrap();
