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
import { TrainingStore } from '../../data/training.store';

@Component({
  selector: 'sf-training-details',
  imports: [FormsModule, ReactiveFormsModule, TranslatePipe, Button, FormInputComponent, FormTextareaComponent, FormSelectComponent],
  templateUrl: './training-details.component.html',
  styleUrl: './training-details.component.scss',
})
export class TrainingDetailsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() trainingId!: string;
  @Output() submitTraining = new EventEmitter<Training>();
  @Output() cancelTraining = new EventEmitter<void>();

  training: Training | undefined;
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

  ngOnChanges() {
    this.form.reset();
    this.training = this.trainingId ? this.trainingStore.loadById(this.trainingId) : this.createNewTraining();

    if (this.training) {
      this.form.patchValue(this.training);
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
      id: this.training?.id,
      lessons: this.training?.lessons || [],
    };
    this.submitTraining.emit(newTraining);
  }

  onCancel() {
    this.cancelTraining.emit();
  }

  createNewTraining(): Training {
    return {
      name: '',
      description: '',
      defaultInterval: null,
      lessons: [],
    } as Training;
  }
}
