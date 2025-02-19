import { Component, inject, Signal } from '@angular/core';
import { Button } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { TableComponent } from '@ui/table/table.component';
import { TranslatePipe } from '@ngx-translate/core';
import { Training } from '../../model/training';
import { TrainingStore } from '../../data/training.store';

@Component({
  selector: 'sf-training-list',
  imports: [Button, Divider, TableComponent, TranslatePipe],
  templateUrl: './training-list.component.html',
  styleUrl: './training-list.component.scss',
})
export class TrainingListComponent {
  trainingStore = inject(TrainingStore);
  data: Signal<Training[]> = this.trainingStore.trainings;
  showCreateDialog: boolean = false;
  showEditDialog: boolean = false;
  selectedTraining?: Training;

  columns = [
    { field: 'name', header: 'training.details.name', type: 'string', sort: true },
    { field: 'description', header: 'training.details.description', type: 'string', sort: true },
    { field: 'interval', header: 'training.details.interval', type: 'string', sort: true },
  ];

  onEdit(event: Training) {
    this.selectedTraining = event;
    this.showEditDialog = true;
  }

  onDelete(training: Training) {
    this.trainingStore.removeTraining(training?.id);
  }

  addTraining() {
    this.showCreateDialog = true;
  }

  onHideCreateDialog(event: boolean) {
    this.showCreateDialog = event;
  }

  onHideEditDialog(event: boolean) {
    this.showEditDialog = event;
  }
}
