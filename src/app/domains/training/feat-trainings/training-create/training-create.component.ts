import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { TrainingDetailsComponent } from '../training-details/training-details.component';
import { TranslatePipe } from '@ngx-translate/core';
import { Training } from '../../model/training';
import { TrainingStore } from '../../data/training.store';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { TrainingMaterialsComponent } from '../training-materials/training-materials.component';

@Component({
  selector: 'sf-training-create',
  imports: [Dialog, TrainingDetailsComponent, TranslatePipe, Tabs, TabList, Tab, TabPanels, TabPanel, TrainingMaterialsComponent],
  templateUrl: './training-create.component.html',
  styleUrl: './training-create.component.scss',
})
export class TrainingCreateComponent {
  @Input() visible: boolean = false;
  @Input() training!: Training;
  @Output() showCreateDialog = new EventEmitter<boolean>();
  @ViewChild(TrainingDetailsComponent) trainingFormComponent!: TrainingDetailsComponent;
  trainingStore = inject(TrainingStore);

  create(training: Training) {
    training.id = this.getRandomInt(3, 100);
    this.trainingStore.addTraining(training);

    this.visible = false;
    this.showCreateDialog.emit(false);
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  cancel() {
    this.visible = false;
    this.showCreateDialog.emit(false);
  }

  resetForm() {
    this.trainingFormComponent?.form.reset();
  }
}
