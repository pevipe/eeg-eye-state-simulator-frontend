import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TelegramMessagesService {
  private token = environment.telegramBotToken;
  private chatId = environment.telegramChatId;

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<any> {
    const url = `https://api.telegram.org/bot${this.token}/sendMessage`;
    const body = {
      chat_id: this.chatId,
      text: message
    };
    return this.http.post(url, body);
  }
}
