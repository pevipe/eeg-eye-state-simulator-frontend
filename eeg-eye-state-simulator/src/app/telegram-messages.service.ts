import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class TelegramMessagesService implements OnDestroy{

  botToken: string | undefined;
  chatId: string | undefined;

  botTokenSubscription: Subscription | undefined;
  chatIdSubscription: Subscription | undefined;

  constructor(private http: HttpClient, private dataService: DataService) { }
  startSubscriptions(): void {
    this.botTokenSubscription = this.dataService.telegramBotToken$.subscribe(token => {
      this.botToken = token;
    });
    this.chatIdSubscription = this.dataService.telegramChatId$.subscribe(chatId => {
      this.chatId = chatId;
    });
  }

  ngOnDestroy(): void {
    this.botTokenSubscription?.unsubscribe();
    this.chatIdSubscription?.unsubscribe();
  }

  sendMessage(message: string): Observable<any> {
    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
    const body = {
      chat_id: this.chatId,
      text: message
    };
    return this.http.post(url, body);
  }
}
