import { Component, inject, Input, OnChanges } from '@angular/core';
import { TableComponent } from '@ui/table/table.component';
import { Material } from '../../model/material';
import { TrainingStore } from '../../data/training.store';
import { ToolbarModule } from 'primeng/toolbar';
import { ToolbarComponent } from '@ui/toolbar/toolbar.component';
import { Lesson } from '../../model/lesson';

@Component({
  selector: 'sf-training-materials',
  imports: [TableComponent, ToolbarModule, ToolbarComponent],
  templateUrl: './training-materials.component.html',
  styleUrl: './training-materials.component.scss',
})
export class TrainingMaterialsComponent implements OnChanges {
  @Input() lesson!: Lesson;
  trainingStore = inject(TrainingStore);
  data?: Material[];

  columns = [
    { field: 'name', header: 'training.material.name', type: 'string', sort: true },
    { field: 'description', header: 'training.material.description', type: 'string', sort: true },
    { field: 'type', header: 'training.material.type', type: 'icon', sort: true },
  ];

  ngOnChanges() {
    if (this.lesson) {
      this.data = this.lesson.materials;
    }
  }

  onDelete(material: Material) {
    this.data = this.lesson.materials.filter((m) => m.id !== material.id);
    this.lesson.materials = this.data;
    // TODO: this.trainingStore.updateTraining(this.training);
  }

  addMaterial() {
    //this.showCreateDialog = true;
  }
}
