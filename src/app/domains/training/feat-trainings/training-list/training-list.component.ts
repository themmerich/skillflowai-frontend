import { Component, computed, inject, signal } from '@angular/core';
import { Divider } from 'primeng/divider';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Training } from '../../model/training';
import { TrainingStore } from '../../data/training.store';
import { TrainingEditComponent } from '../training-edit/training-edit.component';
import { TrainingCreateComponent } from '../training-create/training-create.component';
import { ToolbarComponent } from '@ui/toolbar/toolbar.component';
import { TreeTableComponent } from '@ui/tree-table/tree-table.component';
import { MessageService, TreeNode } from 'primeng/api';
import { Lesson } from '../../model/lesson';
import { LessonEditComponent } from '../lesson-edit/lesson-edit.component';
import { Toast } from 'primeng/toast';
import { UpdateMessage } from '../../../../shared/model/update-message';

@Component({
  selector: 'sf-training-list',
  imports: [
    Divider,
    TranslatePipe,
    TrainingEditComponent,
    TrainingCreateComponent,
    ToolbarComponent,
    TreeTableComponent,
    LessonEditComponent,
    Toast,
  ],
  templateUrl: './training-list.component.html',
  styleUrl: './training-list.component.scss',
  providers: [MessageService],
})
export class TrainingListComponent {
  messageService = inject(MessageService);
  translateService = inject(TranslateService);
  trainingStore = inject(TrainingStore);

  showTrainingCreateDialog = signal(false);
  showTrainingEditDialog = signal(false);
  selectedTrainingId = signal('');

  showLessonCreateDialog = signal(false);
  showLessonEditDialog = signal(false);
  selectedLessonId = signal('');

  data = computed(() => {
    return this.convertTrainingToTreeNode(this.trainingStore.trainings());
  });

  columns = [
    { field: 'name', header: 'training.name', type: 'string', sort: true, headerStyle: 'width: 30%' },
    { field: 'description', header: 'training.description', type: 'string', sort: true, headerStyle: 'width: 30%' },
    { field: 'interval', header: 'training.defaultInterval', type: 'option', sort: false, headerStyle: 'width: 20%' },
  ];

  convertTrainingToTreeNode(data?: Training[]): TreeNode[] {
    if (data) {
      return data.map((item) => ({
        key: item.id,
        data: {
          id: item.id,
          name: item.name,
          description: item.description,
          interval: item.defaultInterval,
          showEdit: true,
          type: 'training',
          prefix: 'training',
        },
        children: item.lessons ? this.convertLessonToTreeNode(item.id, item.lessons) : undefined,
      }));
    }
    return [];
  }

  convertLessonToTreeNode(trainingId: string | undefined, data: Lesson[]): TreeNode[] {
    return data.map((item) => ({
      key: item.id,
      data: {
        id: item.id,
        trainingId: trainingId,
        name: item.name,
        description: item.description,
        interval: null,
        showEdit: true,
        type: 'lesson',
        prefix: 'training.lesson',
      },
    }));
  }

  onEdit(event: any) {
    if (event.type === 'lesson') {
      this.selectedLessonId.set(event.id);
      this.selectedTrainingId.set(event.trainingId);
      this.showLessonEditDialog.set(true);
    } else {
      this.selectedTrainingId.set(event.id);
      this.showTrainingEditDialog.set(true);
    }
  }

  onDelete(event: any) {
    if (event.type === 'lesson') {
      this.trainingStore.removeLesson(event?.id, event?.trainingId);
      this.showSuccessMessage('training.lesson.messages.deleted');
    } else {
      this.trainingStore.removeTraining(event?.id);
      this.showSuccessMessage('training.messages.deleted');
    }
  }

  showMessage(event: UpdateMessage) {
    if (event.severity === 'success') {
      this.showSuccessMessage(event.message);
    }
  }

  private showSuccessMessage(detailMessage: string) {
    this.translateService.get(['shared.message.success', detailMessage]).subscribe((translations) => {
      this.messageService.add({
        severity: 'success',
        summary: translations['shared.message.success'],
        detail: translations[detailMessage],
      });
    });
  }
}
