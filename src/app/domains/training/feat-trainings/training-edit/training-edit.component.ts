import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { TranslatePipe } from '@ngx-translate/core';
import { TrainingDetailsComponent } from '../training-details/training-details.component';
import { Training } from '../../model/training';
import { TrainingStore } from '../../data/training.store';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { TrainingMaterialsComponent } from '../training-materials/training-materials.component';

@Component({
  selector: 'sf-training-edit',
  imports: [Dialog, TranslatePipe, TrainingDetailsComponent, Tab, TabList, TabPanel, TabPanels, Tabs, TrainingMaterialsComponent],
  templateUrl: './training-edit.component.html',
  styleUrl: './training-edit.component.scss',
})
export class TrainingEditComponent {
  @Input() visible: boolean = false;
  @Input() training!: Training;
  @Output() showEditDialog = new EventEmitter<boolean>();
  trainingStore = inject(TrainingStore);

  update(training: Training) {
    this.trainingStore.updateTraining(training);

    this.visible = false;
    this.showEditDialog.emit(false);
  }

  cancel() {
    this.visible = false;
    this.showEditDialog.emit(false);
  }
}
