import { Component, Input } from '@angular/core';
import { QuestionWithAnswerInterface } from '../Interfaces/question-interface';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card-component.component.html',
  styleUrls: ['./question-card-component.component.css']
})
export class QuestionCardComponent {

  @Input() questionWithAnswer: QuestionWithAnswerInterface;
  selectedAnswerId: number;
  isCorrect: boolean = false;
  hasAnswered: boolean = false;
  expandedAnswers: { [key: number]: boolean } = {};

  selectAnswer(answerId: number): void {
    this.selectedAnswerId = answerId;
    this.isCorrect = this.selectedAnswerId === this.questionWithAnswer.accepted_answer_id;
    this.hasAnswered = true;
  }

  isAccepted(answerId: number): boolean {
    return answerId === this.questionWithAnswer.accepted_answer_id;
  }

  toggleExpand(answerId: number): void {
    this.expandedAnswers[answerId] = !this.expandedAnswers[answerId];
  }

  isExpanded(answerId: number): boolean {
    return !!this.expandedAnswers[answerId];
  }
}