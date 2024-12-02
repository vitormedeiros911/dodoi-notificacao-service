import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { PushNotificationService } from './push-notification.service';

@Controller('push-notification')
export class PushNotificationController {
  constructor(
    private readonly pushNotificationService: PushNotificationService,
  ) {}

  @EventPattern('send-notification')
  async sendNotification(@Payload() data: any) {
    return this.pushNotificationService.sendNotification(data);
  }
}
