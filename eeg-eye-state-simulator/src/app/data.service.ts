import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private selectedSubjectSource = new BehaviorSubject<string>('');
  private selectedWindowSource = new BehaviorSubject<number>(10);

  selectedSubject$ = this.selectedSubjectSource.asObservable();
  selectedWindow$ = this.selectedWindowSource.asObservable();

  constructor() { }

  updateSelectedSubject(subject: string) {
    this.selectedSubjectSource.next(subject);
  }
  updateSelectedWindow(window: number) {
    this.selectedWindowSource.next(window);
  }

}
