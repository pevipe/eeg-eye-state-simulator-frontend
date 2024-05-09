import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassifiersApiService {
  baseUrl = 'http://localhost:8000/classifiers';

  constructor(private http: HttpClient) { }

  getUploadedSubjects(): Observable<string[]> {
    return this.http.get<any>(this.baseUrl + '/uploaded_subjects').pipe(
      map(response => response.data)
    );
    // return of(["subject_1", "subject_2", "subject_3", "subject_4", "subject_5"]);  // mock subject list
  }

  uploadSubject(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.baseUrl + '/upload_subject', formData);
        
    // return of(null);  // mock upload
  }

  windowSubject(fileName: string, window_size: number): Observable<any> {
    // let params: HttpParams = new HttpParams();
    // params = params.append('subject', fileName).append('window', window_size);
    // return this.http.post(this.baseUrl + '/window_subject', null, {params: params});

    return of(null);  // mock window
  }
}
