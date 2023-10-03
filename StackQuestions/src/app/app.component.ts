import { Component, OnInit } from '@angular/core';
import { StackExchangeServiceService } from './stack-exchange-service/stack-exchange-service.service';
import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs';

import { QuestionWithAnswerInterface } from './Interfaces/question-interface';
import { QuestionCardComponent } from './question-card-component/question-card-component.component'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Stack Overflow Quiz.';
  questionsWithAnswers$: Observable<QuestionWithAnswerInterface[]>| undefined;

  constructor(private stackExchangeServiceService: StackExchangeServiceService) {}

  ngOnInit(): void {
    this.questionsWithAnswers$ = this.stackExchangeServiceService.getQuestions().pipe(
      switchMap(questions => {
        const questionWithAnswers$ = questions.map(question => {
          return this.stackExchangeServiceService.getAnswers(question.question_id).pipe(
            catchError(err => {
              console.error(`Error occurred while fetching answers for question ${question.question_id}`, err);
              return of([]); // returns an empty array if there's an error fetching answers
            }),
            map(answers => ({ ...question, answers }))
          );
        });
        return forkJoin(questionWithAnswers$);
      })
    );
  }
}
