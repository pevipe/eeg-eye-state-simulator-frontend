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

  private toApiFormat(algorithm: string): string {
    if (algorithm == "Linear Discriminant Analysis")
      return "LDA";
    else if (algorithm == "Quadratic Discriminant Analysis")
      return "QDA";
    else if (algorithm == "Support Vector Machine")
      return "SVM";
    else if (algorithm == "k-Nearest Neighbors")
      return "kNN";
    else if (algorithm == "Decision Tree")
      return "DecisionTree";
    else if (algorithm == "Random Forest")
      return "RandomForest";
    
    return algorithm;
  }

  isOptimized(subjectName: string, algorithm: string, window_size: number): Observable<boolean> {
    // When called without parameters, return false
    if (subjectName == "" || algorithm == ""){
      return of(false);
    }

    const params = {subject: subjectName, algorithm: this.toApiFormat(algorithm), window: window_size};
    return this.http.get<boolean>(this.baseUrl + "/is_optimized", {params: params});

    // if (subjectName == "Sujeto_1" && algorithm == "AdaBoost" && window_size == 10)  //mock
    //   return of(true);
    // else
    //   return of(false);
  }

  optimize(subjectName: string, algorithm: string, window_size: number): Observable<any> {
    // Convert to format in API
    var alg: string = algorithm;

    const params = {subject: subjectName, algorithm: this.toApiFormat(algorithm), window: window_size};
    return this.http.post<any>(this.baseUrl + "/optimize", null, {params: params});
    
    // return of(null);  // mock optimize
  }

  train(subjectName: string, algorithm: string, window_size: number, train_size: number, useCustomHyperparams: boolean): Observable<any> {
    const params = {subject: subjectName, algorithm: this.toApiFormat(algorithm), window: window_size, train_set_size: train_size, use_optimized_hyperparams: useCustomHyperparams};
    return this.http.post<any>(this.baseUrl + "/train", null, {params: params});
    
    // return of(null);  // mock train
  }
}
