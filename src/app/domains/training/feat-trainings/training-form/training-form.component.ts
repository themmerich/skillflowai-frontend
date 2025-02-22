import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Training } from '../../model/training';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { FormInputComponent } from '@ui/form-input/form-input.component';

@Component({
  selector: 'sf-training-form',
  imports: [FormsModule, ReactiveFormsModule, TranslatePipe, Button, FormInputComponent],
  templateUrl: './training-form.component.html',
  styleUrl: './training-form.component.scss',
})
export class TrainingFormComponent implements OnChanges {
  @Input() training?: Training;
  @Output() submitTraining = new EventEmitter<Training>();
  @Output() cancelTraining = new EventEmitter<void>();

  form = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    description: new FormControl<string>('', { nonNullable: true }),
    interval: new FormControl<string>('', { nonNullable: true }),
    numberOfQuestions: new FormControl<number>(0, { nonNullable: true }),
    numberOfCorrectQuestions: new FormControl<number>(0, { nonNullable: true }),
    notes: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  });

  ngOnChanges() {
    if (this.training) {
      this.form.reset();
      this.form.patchValue(this.training);
    } else {
      this.form.reset();
      this.form.controls.name.markAsPristine();
      this.form.controls.name.markAsUntouched();
    }
  }

  onSubmit() {
    const formValue = this.form.getRawValue();
    const newTraining: Training = {
      ...formValue,
    };
    this.submitTraining.emit(newTraining);
  }

  onCancel() {
    this.cancelTraining.emit();
  }
}
