import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { appConfig } from "./shared/setup";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setting up swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Imagitron - CRM Backend")
    .setDescription("Backend for Imagitron's CRM Application")
    .setVersion("1.0.0")
    .addBearerAuth({ in: "header", type: "http" })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, document);

  await app.listen(appConfig.appPort);
}

bootstrap();
