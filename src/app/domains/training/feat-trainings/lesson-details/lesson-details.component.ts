import { Component, computed, effect, inject, input, output, Signal } from '@angular/core';
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
export class LessonDetailsComponent {
  trainingId = input<string>();
  lessonId = input<string>();
  lesson: Signal<Lesson> = computed(() => this.trainingStore.loadOrCreateLesson(this.lessonId()));
  submitLesson = output<Lesson>();
  cancelLesson = output<void>();

  trainingStore = inject(TrainingStore);

  form = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    description: new FormControl<string>('', { nonNullable: true }),
    notes: new FormControl<string>('', { nonNullable: true }),
  });

  constructor() {
    effect(() => {
      const lesson = this.lesson();
      if (lesson) {
        setTimeout(() => {
          this.form.reset();
          this.form.patchValue(lesson);
        });
      }
    });
  }

  onSubmit() {
    const formValue = this.form.getRawValue();
    const loadedLesson = this.lesson();
    const newLesson: Lesson = {
      ...formValue,
      id: loadedLesson.id,
      materials: loadedLesson.materials || [],
    };
    this.submitLesson.emit(newLesson);
  }

  onCancel() {
    this.cancelLesson.emit();
  }
}
