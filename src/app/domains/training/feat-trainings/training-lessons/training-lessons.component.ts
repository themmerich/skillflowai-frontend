import { Component, computed, effect, inject, input, output, Signal } from '@angular/core';
import { TableComponent } from '@ui/table/table.component';
import { ToolbarComponent } from '@ui/toolbar/toolbar.component';
import { Lesson } from '../../model/lesson';
import { TrainingStore } from '../../data/training.store';
import { Training } from '../../model/training';

@Component({
  selector: 'sf-training-lessons',
  imports: [TableComponent, ToolbarComponent],
  templateUrl: './training-lessons.component.html',
  styleUrl: './training-lessons.component.scss',
})
export class TrainingLessonsComponent {
  trainingStore = inject(TrainingStore);
  trainingId = input<string>();
  training: Signal<Training> = computed(() => this.trainingStore.loadOrCreateTraining(this.trainingId()));
  data: Lesson[] = [];
  deletedLesson = output<boolean>();
  reorderedLesson = output<boolean>();

  columns = [
    { field: 'name', header: 'training.lesson.name', type: 'string', sort: false },
    { field: 'description', header: 'training.lesson.description', type: 'string', sort: false },
  ];

  constructor() {
    effect(() => {
      this.data = this.training().lessons;
    });
  }

  onDelete(lesson: Lesson) {
    this.data = this.data.filter((l) => l.id !== lesson.id);
    this.trainingStore.updateLessons(this.trainingId(), this.data);
    this.deletedLesson.emit(true);
  }

  onReorder() {
    this.trainingStore.updateLessons(this.trainingId(), this.data);
    this.reorderedLesson.emit(true);
  }

  addLesson() {
    // TODO: this
  }
}
