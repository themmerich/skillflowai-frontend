import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingQuestionsComponent } from './training-questions.component';

describe('TrainingQuestionsComponent', () => {
  let component: TrainingQuestionsComponent;
  let fixture: ComponentFixture<TrainingQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
