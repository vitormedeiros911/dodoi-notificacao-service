import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { NotificacaoDto } from './dto/notificacao.dto';

@Injectable()
export class PushNotificationService {
  constructor(private readonly httpService: HttpService) {}

  private readonly appId = process.env.PUSH_NOTIFICATION_APP_ID;
  private readonly apiKey = process.env.PUSH_NOTIFICATION_API_KEY;
  private readonly apiUrl = 'https://api.onesignal.com/notifications';

  sendNotification(data: NotificacaoDto) {
    try {
      this.httpService.post(
        this.apiUrl,
        {
          app_id: this.appId,
          headings: { en: data.titulo, pt: data.titulo },
          contents: { en: data.mensagem, pt: data.mensagem },
          target_channel: 'push',
          filters: [
            {
              field: 'tag',
              key: data.tagKey,
              relation: '=',
              value: data.tagValue,
            },
          ],
        },
        {
          headers: {
            Authorization: `Key ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error) {
      console.error(
        'Erro ao enviar notificação:',
        error.response?.data || error.message,
      );
      throw new Error('Falha ao enviar notificação');
    }
  }
}
