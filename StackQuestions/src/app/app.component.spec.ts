import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { StackExchangeServiceService } from './stack-exchange-service/stack-exchange-service.service';
import { QuestionWithAnswerInterface } from './Interfaces/question-interface';
import { QuestionCardComponent } from './question-card-component/question-card-component.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockStackExchangeServiceService: Partial<StackExchangeServiceService>;

  const mockQuestions: QuestionWithAnswerInterface[] = [
    {      
    tags: ['angular', 'testing', 'typescript'],
    owner: {
        account_id: 1,
        reputation: 250,
        user_id: 1001,
        user_type: 'moderator',
        profile_image: 'https://example.com/image1.jpg',
        display_name: 'John Doe',
        link: 'https://example.com/johndoe',
    },
    is_answered: true,
    view_count: 150,
    accepted_answer_id: 5001,
    answer_count: 2,
    score: 5,
    last_activity_date: 1672375241,
    creation_date: 1672274841,
    last_edit_date: 1672300000,
    question_id: 101,
    content_license: 'CC BY-SA',
    link: 'https://example.com/questions/101',
    title: 'How to test an Angular component?',
    body: 'I am having trouble testing my Angular component...',
    answers: [
        {
            owner: {
                account_id: 2,
                reputation: 150,
                user_id: 1002,
                user_type: 'user',
                profile_image: 'https://example.com/image2.jpg',
                display_name: 'Jane Smith',
                link: 'https://example.com/janesmith',
            },
            is_accepted: true,
            score: 3,
            last_activity_date: 1672375100,
            creation_date: 1672274900,
            answer_id: 5001,
            question_id: 101,
            content_license: 'CC BY-SA',
            body: 'You can use TestBed from @angular/core/testing...',
        },
        {
            owner: {
                account_id: 3,
                reputation: 50,
                user_id: 1003,
                user_type: 'user',
                profile_image: 'https://example.com/image3.jpg',
                display_name: 'Bob Alice',
                link: 'https://example.com/bobalice',
            },
            is_accepted: false,
            score: 0,
            last_activity_date: 1672375200,
            creation_date: 1672275000,
            answer_id: 5002,
            question_id: 101,
            content_license: 'CC BY-SA',
            body: 'Another way to test is ...',
        }]
    }];

  beforeEach(() => {
    // Create the mock service
    mockStackExchangeServiceService = {
      getQuestions: () => of(mockQuestions),
      getAnswers: (question_id: number) => of(mockQuestions[0].answers || [])
    };

    TestBed.configureTestingModule({
      declarations: [AppComponent, QuestionCardComponent], // Note: You might need to mock QuestionCardComponent or import any necessary modules
      providers: [{ provide: StackExchangeServiceService, useValue: mockStackExchangeServiceService }]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load questions with answers on init', (done) => {
    component.ngOnInit();
    component.questionsWithAnswers$?.subscribe(data => {
      expect(data).toEqual(mockQuestions);
      done();
    });
  });

  // Add any additional tests based on component behavior
});
