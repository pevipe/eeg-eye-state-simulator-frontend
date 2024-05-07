import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassifiersApiService {
  baseUrl = 'http://localhost:8080/classifiers';

  constructor(private http: HttpClient) { }

  getUploadedSubjects(): Observable<string[]> {
    // return this.http.get<string[]>(this.baseUrl + '/uploaded_subjects');
    return of(["subject_1", "subject_2", "subject_3", "subject_4", "subject_5"]);  // mock subject list
  }

  uploadSubject(fileName: string, formData: FormData): Observable<any> {
    // return this.http.post(this.baseUrl + '/upload_subject', formData);
    return of(null);  // mock upload
  }
}
