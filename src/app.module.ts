import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { PushNotificationModule } from './push-notification/push-notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    PushNotificationModule,
  ],
})
export class AppModule {}
