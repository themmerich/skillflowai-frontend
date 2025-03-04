import { Component, inject, input, model, output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { TranslatePipe } from '@ngx-translate/core';
import { TrainingDetailsComponent } from '../training-details/training-details.component';
import { TrainingStore } from '../../data/training.store';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { Training } from '../../model/training';
import { TrainingLessonsComponent } from '../training-lessons/training-lessons.component';
import { MessageService } from 'primeng/api';
import { UpdateMessage } from '../../../../shared/model/update-message';

@Component({
  selector: 'sf-training-edit',
  imports: [Dialog, TranslatePipe, TrainingDetailsComponent, Tab, TabList, TabPanel, TabPanels, Tabs, TrainingLessonsComponent],
  templateUrl: './training-edit.component.html',
  styleUrl: './training-edit.component.scss',
  providers: [MessageService],
})
export class TrainingEditComponent {
  visible = model.required<boolean>();
  trainingId = input.required<string>();
  showMessage = output<UpdateMessage>();

  trainingStore = inject(TrainingStore);

  update(training: Training) {
    this.trainingStore.updateTraining(training);

    this.visible.set(false);

    this.showMessage.emit({
      severity: 'success',
      message: 'training.messages.updated',
    });
  }

  cancel() {
    this.visible.set(false);
  }

  deleteLesson() {
    this.showMessage.emit({
      severity: 'success',
      message: 'training.lesson.messages.deleted',
    });
  }

  reorderLesson() {
    this.showMessage.emit({
      severity: 'success',
      message: 'training.lesson.messages.updated',
    });
  }
}
