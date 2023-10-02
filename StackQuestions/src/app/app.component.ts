import { Component, OnInit } from '@angular/core';
import { StackExchangeServiceService } from './stack-exchange-service/stack-exchange-service.service';
import { Observable } from 'rxjs';

import { QuestionInterface } from './Interfaces/question-interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Stack Overflow Quiz.';
  questions$: Observable<QuestionInterface[]>;

  constructor(private stackExchangeServiceService: StackExchangeServiceService) {}

  ngOnInit(): void {
    this.questions$ = this.stackExchangeServiceService.getQuestions();
  }
}
