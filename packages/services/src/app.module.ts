import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';
import { HealthzModule } from './healthz/healthz.module';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './middlewares/httplogger.middleware';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todos/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production', '.env'],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    /**
     * Keeping for reference for future purposes
     */
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongoDbUri = configService.get('MONGO_DB_URI');
        return {
          uri: mongoDbUri,
          dbName: configService.get('DB_NAME'),
        };
      },
      inject: [ConfigService],
    }),
    HealthzModule,
    UserModule,
    AuthModule,
    TodoModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
