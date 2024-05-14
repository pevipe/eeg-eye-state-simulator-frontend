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

  selectedSubject$ = this.selectedSubjectSource.asObservable();
  selectedWindow$ = this.selectedWindowSource.asObservable();
  selectedTrainSize$ = this.selectedTrainSizeSource.asObservable();
  graphData$ = this.graphDataSource.asObservable();

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

}
