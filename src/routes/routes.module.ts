import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Route, RouteSchema } from "./entities/route.entity";
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Route.name, schema: RouteSchema }
    ]),
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        useFactory: () => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'code-delivery',
              brokers: ['host.docker.internal:9094'],
            },
            consumer: {
              groupId:
                !process.env.KAFKA_CONSUMER_GROUP_ID ||
                process.env.KAFKA_CONSUMER_GROUP_ID === ''
                  ? 'my-consumer-' + Math.random()
                  : process.env.KAFKA_CONSUMER_GROUP_ID,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [RoutesController],
  providers: [RoutesService]
})
export class RoutesModule {}
