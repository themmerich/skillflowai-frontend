import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingMaterialsComponent } from './training-materials.component';

describe('TrainingMaterialsComponent', () => {
  let component: TrainingMaterialsComponent;
  let fixture: ComponentFixture<TrainingMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingMaterialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
