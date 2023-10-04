import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuestionInterface } from '../Interfaces/question-interface';
import { AnswerInterface } from '../Interfaces/answer-interface';
import { StackExchangeServiceService } from './stack-exchange-service.service';

describe('StackExchangeServiceService', () => {
  let service: StackExchangeServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StackExchangeServiceService]
    });

    service = TestBed.inject(StackExchangeServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that no requests are outstanding
  });

  it('should fetch questions', () => {
    const mockQuestions: QuestionInterface[] = [
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
      }
    ];

    service.getQuestions().subscribe(questions => {
      expect(questions.length).toBeGreaterThan(0);
      // You can add more specific assertions based on your mock data here
    });

    const req = httpMock.expectOne(service['stackExchangeUri'] + service['questionSearch']);
    expect(req.request.method).toBe('GET');
    req.flush({ items: mockQuestions });
  });

  it('should fetch answers for a given question', () => {
    const mockAnswers: AnswerInterface[] = [
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
  ];

    const mockQuestionId = 123;
    service.getAnswers(mockQuestionId).subscribe(answers => {
      expect(answers.length).toBeGreaterThan(0);
      // You can add more specific assertions based on your mock data here
    });

    const req = httpMock.expectOne(`${service['stackExchangeUri']}${service['questionRoute']}${mockQuestionId}${service['answersSearch']}`);
    expect(req.request.method).toBe('GET');
    req.flush({ items: mockAnswers });
  });

  it('should handle error while fetching questions', () => {
    service.getQuestions().subscribe(
      () => fail('Should have failed with some error'),
      (error) => expect(error).toBeTruthy()
    );

    const req = httpMock.expectOne(service['stackExchangeUri'] + service['questionSearch']);
    req.error(new ErrorEvent('Network error'));
  });

  it('should handle error while fetching answers', () => {
    const mockQuestionId = 123;
    service.getAnswers(mockQuestionId).subscribe(
      () => fail('Should have failed with some error'),
      (error) => expect(error).toBeTruthy()
    );

    const req = httpMock.expectOne(`${service['stackExchangeUri']}${service['questionRoute']}${mockQuestionId}${service['answersSearch']}`);
    req.error(new ErrorEvent('Network error'));
  });
});
