import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerModule } from "nestjs-pino";
import { randomUUID } from "crypto";

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: "info",

        genReqId: (req) => {
          return req.headers["x-request-id"]?.toString() || randomUUID();
        },

        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            singleLine: true,
          },
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
