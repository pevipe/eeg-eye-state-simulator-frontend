import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private selectedSubjectSource = new BehaviorSubject<string>('');
  private selectedWindowSource = new BehaviorSubject<number>(10);
  private selectedTrainSizeSource = new BehaviorSubject<number>(70);
  private graphDataSource = new BehaviorSubject<[number, number, number]>([-1, -1, -1]);
  private simulationGraphStructSource = new BehaviorSubject<[number[], number[], string[]]>([[], [], []]);
  private telegramBotTokenSource = new BehaviorSubject<string>('');
  private telegramChatIdSource = new BehaviorSubject<string>('');
  // private realGraphDataSource = new BehaviorSubject<number[]>([]);
  // private predictedGraphDataSource = new BehaviorSubject<number[]>([]);
  // private graphLabelsSource = new BehaviorSubject<string[]>([]);


  selectedSubject$ = this.selectedSubjectSource.asObservable();
  selectedWindow$ = this.selectedWindowSource.asObservable();
  selectedTrainSize$ = this.selectedTrainSizeSource.asObservable();
  graphData$ = this.graphDataSource.asObservable();
  simulationGraphStruct$ = this.simulationGraphStructSource.asObservable();
  telegramBotToken$ = this.telegramBotTokenSource.asObservable();
  telegramChatId$ = this.telegramChatIdSource.asObservable();

  constructor() { }

  updateSelectedSubject(subject: string) {
    this.selectedSubjectSource.next(subject);
  }
  updateSelectedWindow(window: number) {
    this.selectedWindowSource.next(window);
  }
  updateTrainSize(trainSize: number) {
    this.selectedTrainSizeSource.next(trainSize);
  }
  updateGraphData(data: [number, number, number]) {
    this.graphDataSource.next(data);
  }
  updateSimulationGraphData(realData: number[], predictedDate: number[], labels: string[]) {
    this.simulationGraphStructSource.next([realData, predictedDate, labels]);
  }
  updateTelegramBotToken(token: string) {
    this.telegramBotTokenSource.next(token);
  }
  updateTelegramChatId(chatId: string) {
    this.telegramChatIdSource.next(chatId);
  }

}
