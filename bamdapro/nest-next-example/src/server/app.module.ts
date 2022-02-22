import { NODE_ENV } from './../shared/constants/env';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { ConfigModule, ConfigService } from '@nestjs/config'
import getConfig from 'src/shared'

@Module({
  imports: [RenderModule.forRootAsync(Next({dev: NODE_ENV === 'development' }),  { viewsDir: null }),
    ConfigModule.forRoot({
      load: [getConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
