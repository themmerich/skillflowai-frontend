import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMultiselectComponent } from './form-multiselect.component';

describe('FormMultiselectComponent', () => {
  let component: FormMultiselectComponent;
  let fixture: ComponentFixture<FormMultiselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMultiselectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
