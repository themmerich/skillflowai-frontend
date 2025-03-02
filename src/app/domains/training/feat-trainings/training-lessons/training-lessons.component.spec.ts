import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingLessonsComponent } from './training-lessons.component';

describe('TrainingLessonsComponent', () => {
  let component: TrainingLessonsComponent;
  let fixture: ComponentFixture<TrainingLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingLessonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
