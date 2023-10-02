import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AnswerInterface } from '../Interfaces/answer-interface';
import { QuestionInterface } from '../Interfaces/question-interface';

@Injectable({
  providedIn: 'root'
})
export class StackExchangeServiceService {
  private stackExchangeUri = 'https://api.stackexchange.com/2.3/';
  private questionSearch = 'search/advanced?order=desc&sort=creation&accepted=True&answers=2&filter=withbody&site=stackoverflow';
  private answersSearch = '/answers?order=desc&sort=activity&site=stackoverflow&filter=!nNPvSNdWme'
  private questionRoute = 'questions/'


  constructor(private http: HttpClient) { }

  getQuestions(): Observable<QuestionInterface[]> {
    const url = `${this.stackExchangeUri}${this.questionSearch}`;
    return this.http.get<{ items: QuestionInterface[] }>(url)
        .pipe(
            map(response => response.items),
            catchError(err => {
                console.error('Error occurred while fetching questions', err);
                return throwError(err);
            })
        );
}

  getAnswers(question_id: number): Observable<AnswerInterface[]> {
    const url = `${this.stackExchangeUri}${this.questionRoute}${question_id}${this.answersSearch}`;
    return this.http.get<AnswerInterface[]>(url);
  }

}
