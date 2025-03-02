import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { TableComponent } from '@ui/table/table.component';
import { ToolbarComponent } from '@ui/toolbar/toolbar.component';
import { Lesson } from '../../model/lesson';
import { TrainingStore } from '../../data/training.store';

@Component({
  selector: 'sf-training-lessons',
  imports: [TableComponent, ToolbarComponent],
  templateUrl: './training-lessons.component.html',
  styleUrl: './training-lessons.component.scss',
})
export class TrainingLessonsComponent implements OnChanges {
  @Input() trainingId!: string;
  @Output() deletedLesson = new EventEmitter<boolean>();
  @Output() reorderedLesson = new EventEmitter<boolean>();
  data: Lesson[] = [];

  trainingStore = inject(TrainingStore);

  columns = [
    { field: 'name', header: 'training.lesson.name', type: 'string', sort: false },
    { field: 'description', header: 'training.lesson.description', type: 'string', sort: false },
  ];

  ngOnChanges() {
    if (this.trainingId) {
      const training = this.trainingStore.loadById(this.trainingId);
      if (training) {
        this.data = training.lessons;
      }
    }
  }

  onDelete(lesson: Lesson) {
    const training = this.trainingStore.loadById(this.trainingId);
    if (training) {
      this.data = training.lessons.filter((l) => l.id !== lesson.id);
      training.lessons = this.data;
      this.trainingStore.updateTraining(training);
      this.deletedLesson.emit(true);
    }
  }

  onReorder() {
    const training = this.trainingStore.loadById(this.trainingId);
    if (training) {
      training.lessons = this.data;
      this.trainingStore.updateTraining(training);
      this.reorderedLesson.emit(true);
    }
  }

  addLesson() {
    // TODO: this
  }
}
