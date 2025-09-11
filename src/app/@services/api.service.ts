import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { FeedbackRes } from '../@models/feedback.model';
import { environment } from './environment'; // 路徑依你專案而定
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl; // 用環境變數

  constructor(private http: HttpClient) { }

  //訂車相關
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
  fillin(req: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/fillin`, req);
  }
  getFeedbackByQuizId(quizId: number) {
    return this.http.post<FeedbackRes>(`http://localhost:8080/quiz/feedback?quizId=${quizId}`, null);
  }
  getStatistics(quizId: number): Observable<any> {
    const params = new HttpParams().set('quizId', quizId.toString());
    return this.http.post(`${this.baseUrl}/statistics`, null, { params });
  }


  //停車場相關
  create(req: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/park/create`, req);
  }
  update(req: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/park/update`, req);
  }
  delete(phone: string): Observable<any> {
    const params = new HttpParams().set('phone', phone);
    return this.http.delete(`${this.baseUrl}/park/delete`, { params });
  }
  getInfo(phone: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/park/getInfo?phone=${encodeURIComponent(phone.trim())}`);
  }
  getAllInfos(date: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/park/getAllInfo`, { params: { date } });
  }


  //管理員
  login(req: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, req);
  }
  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {});
  }
}
