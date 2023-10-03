import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCardComponent } from './question-card-component.component';

describe('QuestionCardComponentComponent', () => {
  let component: QuestionCardComponent;
  let fixture: ComponentFixture<QuestionCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionCardComponent]
    });
    fixture = TestBed.createComponent(QuestionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
