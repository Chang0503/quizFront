import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { FeedbackRes } from '../@models/feedback.model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/quiz';

  constructor(private http: HttpClient) { }

  getAllQuizzes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAll`);
  }
  createQuiz(req: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, req);
  }

  updateQuiz(req: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/update`, req);
  }

  deleteQuiz(req: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/delete`, req);
  }
  getQuizById(quizId: number) {
    return this.http.post<any>(`http://localhost:8080/quiz/getByQuizId?quizId=${quizId}`, {});
  }

  // 送出填寫問卷資料
  fillin(req: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/fillin`, req);
  }

  // 取得問卷填答資料
getFeedbackByQuizId(quizId: number) {
  return this.http.post<FeedbackRes>(`http://localhost:8080/quiz/feedback?quizId=${quizId}`, null);
}

  // 取得問卷統計資料
  getStatistics(quizId: number): Observable<any> {
    const params = new HttpParams().set('quizId', quizId.toString());
    return this.http.post(`${this.baseUrl}/statistics`, null, { params });
  }

}
