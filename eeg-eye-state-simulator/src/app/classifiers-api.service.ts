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

  windowSubject(subjectName: string, window_size: number): Observable<any> {
    const data = {"subject": subjectName, "window": window_size};
    console.log(data);
    return this.http.post<any>(this.baseUrl + '/window_subject', null, {params: data});

    // return of(null);  // mock window
  }

  isOptimized(subjectName: string, algorithm: string, window_size: number): Observable<boolean> {
    if (subjectName == "" || algorithm == ""){
      return of(false);
    }

    // Convert to format in API
    var alg: string = algorithm;
    if (algorithm == "Linear Discriminant Analysis")
      alg = "LDA";
    else if (algorithm == "Quadratic Discriminant Analysis")
      alg = "QDA";
    else if (algorithm == "Support Vector Machine")
      alg = "SVM";
    else if (algorithm == "k-Nearest Neighbors")
      alg = "kNN";
    const params = {subject: subjectName, algorithm: alg, window: window_size};
    return this.http.get<boolean>(this.baseUrl + "/is_optimized", {params: params});

    // if (subjectName == "Sujeto_1" && algorithm == "AdaBoost" && window_size == 10)  //mock
    //   return of(true);
    // else
    //   return of(false);
  }
}
