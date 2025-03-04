import { Component, computed, effect, inject, input, OnDestroy, OnInit, output, Signal } from '@angular/core';
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
import { TrainingStore } from '../../data/training.store';

@Component({
  selector: 'sf-training-details',
  imports: [FormsModule, ReactiveFormsModule, TranslatePipe, Button, FormInputComponent, FormTextareaComponent, FormSelectComponent],
  templateUrl: './training-details.component.html',
  styleUrl: './training-details.component.scss',
})
export class TrainingDetailsComponent implements OnInit, OnDestroy {
  trainingId = input<string>();
  training: Signal<Training> = computed(() => this.trainingStore.loadOrCreateTraining(this.trainingId()));
  submitTraining = output<Training>();
  cancelTraining = output<void>();

  intervalService = inject(IntervalService);
  trainingStore = inject(TrainingStore);

  availableIntervals: Interval[] = [];
  private destroy$ = new Subject<void>();

  form = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    description: new FormControl<string>('', { nonNullable: true }),
    defaultInterval: new FormControl<Interval | null>(null),
    notes: new FormControl<string>('', { nonNullable: true }),
  });

  constructor() {
    effect(() => {
      const training = this.training();
      if (training) {
        setTimeout(() => {
          this.form.reset();
          this.form.patchValue(training);
        });
      }
    });
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
    const loadedTraining = this.training();
    const newTraining: Training = {
      ...formValue,
      id: loadedTraining.id,
      lessons: loadedTraining.lessons || [],
      rating: loadedTraining.rating || 0,
    };
    this.submitTraining.emit(newTraining);
  }

  onCancel() {
    this.cancelTraining.emit();
  }
}
