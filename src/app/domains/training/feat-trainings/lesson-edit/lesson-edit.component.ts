import { Component, inject, input, model, output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { TranslatePipe } from '@ngx-translate/core';
import { TrainingStore } from '../../data/training.store';
import { Lesson } from '../../model/lesson';
import { LessonDetailsComponent } from '../lesson-details/lesson-details.component';
import { UpdateMessage } from '../../../../shared/model/update-message';

@Component({
  selector: 'sf-lesson-edit',
  imports: [Dialog, Tab, TabList, TabPanel, TabPanels, Tabs, TranslatePipe, LessonDetailsComponent],
  templateUrl: './lesson-edit.component.html',
  styleUrl: './lesson-edit.component.scss',
})
export class LessonEditComponent {
  visible = model.required<boolean>();
  lessonId = input.required<string>();
  trainingId = input.required<string>();
  showMessage = output<UpdateMessage>();

  trainingStore = inject(TrainingStore);

  update(lesson: Lesson) {
    const training = this.trainingStore.loadOrCreateTraining(this.trainingId());
    if (training) {
      training.lessons = training.lessons.map((l) => {
        if (l.id === lesson.id) {
          return lesson;
        }
        return l;
      });
      this.trainingStore.updateTraining(training);
    }

    this.visible.set(false);

    this.showMessage.emit({
      severity: 'success',
      message: 'training.lesson.messages.updated',
    });
  }

  cancel() {
    this.visible.set(false);
  }
}
