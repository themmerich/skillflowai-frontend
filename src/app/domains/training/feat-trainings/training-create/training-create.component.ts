import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { TrainingFormComponent } from '../training-form/training-form.component';
import { TranslatePipe } from '@ngx-translate/core';
import { Training } from '../../model/training';
import { TrainingStore } from '../../data/training.store';

@Component({
  selector: 'sf-training-create',
  imports: [Dialog, TrainingFormComponent, TranslatePipe],
  templateUrl: './training-create.component.html',
  styleUrl: './training-create.component.scss',
})
export class TrainingCreateComponent {
  @Input() visible: boolean = false;
  @Output() showCreateDialog = new EventEmitter<boolean>();
  @ViewChild(TrainingFormComponent) trainingFormComponent!: TrainingFormComponent;
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
