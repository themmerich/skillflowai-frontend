import { Component, inject, Input, OnChanges, Signal, signal } from '@angular/core';
import { Training } from '../../model/training';
import { TableComponent } from '@ui/table/table.component';
import { Button } from 'primeng/button';
import { Material } from '../../model/material';
import { TrainingStore } from '../../data/training.store';

@Component({
  selector: 'sf-training-materials',
  imports: [TableComponent, Button],
  templateUrl: './training-materials.component.html',
  styleUrl: './training-materials.component.scss',
})
export class TrainingMaterialsComponent implements OnChanges {
  @Input() training!: Training;
  trainingStore = inject(TrainingStore);
  data?: Material[];

  columns = [
    { field: 'name', header: 'training.material.name', type: 'string', sort: true },
    { field: 'description', header: 'training.material.description', type: 'string', sort: true },
    { field: 'type', header: 'training.material.type', type: 'icon', sort: true },
  ];

  ngOnChanges() {
    if (this.training) {
      this.data = this.training.materials;
    }
  }

  onDelete(material: Material) {
    this.data = this.training.materials.filter((m) => m.id !== material.id);
    this.training.materials = this.data;
    this.trainingStore.updateTraining(this.training);
  }

  addMaterial() {
    //this.showCreateDialog = true;
  }
}
