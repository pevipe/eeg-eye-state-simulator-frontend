import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // BehaviorSubjects
  private graphDataSource = new BehaviorSubject<[number, number, number]>([-1, -1, -1]);
  private selectedSubjectSource = new BehaviorSubject<string>('');
  private selectedTrainSizeSource = new BehaviorSubject<number>(70);
  private selectedWindowSource = new BehaviorSubject<number>(10);
  private simulationGraphStructSource = new BehaviorSubject<[number[], number[], string[]]>([[], [], []]);
  private telegramBotTokenSource = new BehaviorSubject<string>('');
  private telegramChatIdSource = new BehaviorSubject<string>('');

  // Observables for BehaviorSubjects
  graphData$ = this.graphDataSource.asObservable();
  selectedSubject$ = this.selectedSubjectSource.asObservable();
  selectedTrainSize$ = this.selectedTrainSizeSource.asObservable();
  selectedWindow$ = this.selectedWindowSource.asObservable();
  simulationGraphStruct$ = this.simulationGraphStructSource.asObservable();
  telegramBotToken$ = this.telegramBotTokenSource.asObservable();
  telegramChatId$ = this.telegramChatIdSource.asObservable();

  constructor() { }

  // Event triggers
  updateGraphData(data: [number, number, number]) {
    this.graphDataSource.next(data);
  }
  updateSelectedSubject(subject: string) {
    this.selectedSubjectSource.next(subject);
  }
  updateTrainSize(trainSize: number) {
    this.selectedTrainSizeSource.next(trainSize);
  }
  updateSelectedWindow(window: number) {
    this.selectedWindowSource.next(window);
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
