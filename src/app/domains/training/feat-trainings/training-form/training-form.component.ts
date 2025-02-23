import { Component, EventEmitter, inject, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Training } from '../../model/training';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { FormInputComponent } from '@ui/form-input/form-input.component';
import { FormTextareaComponent } from '@ui/form-textarea/form-textarea.component';
import { FormSelectComponent } from '@ui/form-select/form-select.component';
import { Subject, takeUntil } from 'rxjs';
import { IntervalService } from '../../data/interval.service';
import { Interval } from '../../model/interval';

@Component({
  selector: 'sf-training-form',
  imports: [FormsModule, ReactiveFormsModule, TranslatePipe, Button, FormInputComponent, FormTextareaComponent, FormSelectComponent],
  templateUrl: './training-form.component.html',
  styleUrl: './training-form.component.scss',
})
export class TrainingFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() training!: Training;
  @Output() submitTraining = new EventEmitter<Training>();
  @Output() cancelTraining = new EventEmitter<void>();

  intervalService = inject(IntervalService);
  availableIntervals: Interval[] = [];
  private destroy$ = new Subject<void>();

  form = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    description: new FormControl<string>('', { nonNullable: true }),
    interval: new FormControl<Interval | null>(null),
    numberOfQuestions: new FormControl<number | null>(null),
    numberOfCorrectQuestions: new FormControl<number | null>(null),
    notes: new FormControl<string>('', { nonNullable: true }),
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

  ngOnInit(): void {
    this.intervalService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((interval) => {
        this.availableIntervals = interval;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    const formValue = this.form.getRawValue();
    const newTraining: Training = {
      ...formValue,
      materials: this.training.materials,
    };
    this.submitTraining.emit(newTraining);
  }

  onCancel() {
    this.cancelTraining.emit();
  }
}
