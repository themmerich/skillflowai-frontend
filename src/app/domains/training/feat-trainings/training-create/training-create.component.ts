import { Component, inject, model, output, ViewChild } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { TrainingDetailsComponent } from '../training-details/training-details.component';
import { TranslatePipe } from '@ngx-translate/core';
import { Training } from '../../model/training';
import { TrainingStore } from '../../data/training.store';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { TrainingLessonsComponent } from '../training-lessons/training-lessons.component';
import { UpdateMessage } from '../../../../shared/model/update-message';

@Component({
  selector: 'sf-training-create',
  imports: [Dialog, TrainingDetailsComponent, TranslatePipe, Tabs, TabList, Tab, TabPanels, TabPanel, TrainingLessonsComponent],
  templateUrl: './training-create.component.html',
  styleUrl: './training-create.component.scss',
})
export class TrainingCreateComponent {
  visible = model.required<boolean>();
  showMessage = output<UpdateMessage>();
  @ViewChild(TrainingDetailsComponent) trainingFormComponent!: TrainingDetailsComponent;

  trainingStore = inject(TrainingStore);

  create(training: Training) {
    training.id = crypto.randomUUID();
    this.trainingStore.addTraining(training);

    this.visible.set(false);

    this.showMessage.emit({
      severity: 'success',
      message: 'training.messages.created',
    });
  }

  cancel() {
    this.visible.set(false);
  }

  resetForm() {
    this.trainingFormComponent?.form.reset();
  }
}
