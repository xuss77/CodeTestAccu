import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionWithAnswerInterface } from '../Interfaces/question-interface';
import { QuestionCardComponent } from './question-card-component.component';

describe('QuestionCardComponent', () => {
  let component: QuestionCardComponent;
  let fixture: ComponentFixture<QuestionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionCardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCardComponent);
    component = fixture.componentInstance;
    component.questionWithAnswer = {      
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
            },
        ],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update isCorrect and hasAnswered when an answer is selected', () => {
    component.selectAnswer(5001);
    expect(component.isCorrect).toBeTrue();
    expect(component.hasAnswered).toBeTrue();
  });

  it('should determine if an answer is the accepted answer', () => {
    expect(component.isAccepted(5001)).toBeTrue();
    expect(component.isAccepted(1)).toBeFalse();
  });
});

