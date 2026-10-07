import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerModule } from "nestjs-pino";
import { randomUUID } from "crypto";
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: "info",

        genReqId: (req) => {
          return req.headers["x-request-id"]?.toString() || randomUUID();
        },

        serializers: {
          req: (req) => ({
            id: req.id,
            method: req.method,
            url: req.url,
          }),

          res: (res) => ({
            statusCode: res.statusCode,
          }),
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
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
