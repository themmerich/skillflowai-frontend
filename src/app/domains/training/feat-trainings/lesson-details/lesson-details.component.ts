import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { FormInputComponent } from '@ui/form-input/form-input.component';
import { FormTextareaComponent } from '@ui/form-textarea/form-textarea.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { TrainingStore } from '../../data/training.store';
import { Lesson } from '../../model/lesson';

@Component({
  selector: 'sf-lesson-details',
  imports: [Button, FormInputComponent, FormTextareaComponent, ReactiveFormsModule, TranslatePipe],
  templateUrl: './lesson-details.component.html',
  styleUrl: './lesson-details.component.scss',
})
export class LessonDetailsComponent implements OnChanges {
  @Input() trainingId!: string;
  @Input() lessonId!: string;
  @Output() submitLesson = new EventEmitter<Lesson>();
  @Output() cancelLesson = new EventEmitter<void>();

  lesson: Lesson | undefined;
  trainingStore = inject(TrainingStore);

  form = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    description: new FormControl<string>('', { nonNullable: true }),
    notes: new FormControl<string>('', { nonNullable: true }),
  });

  ngOnChanges() {
    this.form.reset();
    this.lesson = this.lessonId ? this.trainingStore.loadLessonById(this.lessonId) : this.createNewLesson();

    if (this.lesson) {
      this.form.patchValue(this.lesson);
    }
  }

  onSubmit() {
    const formValue = this.form.getRawValue();
    const newLesson: Lesson = {
      ...formValue,
      id: this.lesson?.id,
      materials: this.lesson?.materials || [],
    };
    this.submitLesson.emit(newLesson);
  }

  onCancel() {
    this.cancelLesson.emit();
  }

  createNewLesson(): Lesson {
    return {
      name: '',
      description: '',
      materials: [],
    } as Lesson;
  }
}
