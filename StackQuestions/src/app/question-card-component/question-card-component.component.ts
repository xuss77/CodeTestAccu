import { Component, Input, OnInit } from '@angular/core';
import { QuestionWithAnswerInterface } from '../Interfaces/question-interface';
import { AnswerInterface } from '../Interfaces/answer-interface';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card-component.component.html',
  styleUrls: ['./question-card-component.component.css']
})
export class QuestionCardComponent implements OnInit{

  @Input() questionWithAnswer!: QuestionWithAnswerInterface;
  selectedAnswerId!: number;
  isCorrect: boolean = false;
  hasAnswered: boolean = false;
  expandedAnswers: { [key: number]: boolean } = {};

  ngOnInit(){
    this.questionWithAnswer.answers = this.shuffleArray(this.questionWithAnswer.answers )
  }

  selectAnswer(answerId: number): void {
    this.selectedAnswerId = answerId;
    this.isCorrect = this.selectedAnswerId === this.questionWithAnswer.accepted_answer_id;
    this.hasAnswered = true;
  }

  isAccepted(answerId: number): boolean {
    return answerId === this.questionWithAnswer.accepted_answer_id;
  }

  shuffleArray(answers: AnswerInterface[]) {
    var m = answers.length, t, i;
 
    while (m) {    
     i = Math.floor(Math.random() * m--);
     t = answers[m];
     answers[m] = answers[i];
     answers[i] = t;
    }
 
   return answers;
 }
}