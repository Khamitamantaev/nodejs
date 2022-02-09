import { AppUpdate } from './app.update';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        token: config.get<string>('TOKEN_BOT')
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AppController],
  providers: [AppService, AppUpdate],
})
export class AppModule {}
