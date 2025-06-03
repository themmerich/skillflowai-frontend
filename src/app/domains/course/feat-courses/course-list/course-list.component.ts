import { Component, inject, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UpdateMessage } from '../../../../shared/model/update-message';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CourseStore } from '../../data/course.store';
import { Divider } from 'primeng/divider';
import { Toast } from 'primeng/toast';
import { ToolbarComponent } from '@ui/toolbar/toolbar.component';
import { TableComponent } from '@ui/table/table.component';

@Component({
  selector: 'sf-course-list',
  imports: [Divider, Toast, ToolbarComponent, TranslatePipe, TableComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss',
  providers: [MessageService],
})
export class CourseListComponent {
  messageService = inject(MessageService);
  translateService = inject(TranslateService);
  courseStore = inject(CourseStore);

  showCourseCreateDialog = signal(false);
  showCourseEditDialog = signal(false);
  selectedCourseId = signal('');

  showLessonCreateDialog = signal(false);
  showLessonEditDialog = signal(false);
  selectedLessonId = signal('');

  data = this.courseStore.courses;

  columns = [
    { field: 'id', header: 'course.id', type: 'string', sort: true, headerStyle: 'width: 28%' },
    { field: 'title', header: 'course.title', type: 'string', sort: true, headerStyle: 'width: 28%' },
    { field: 'description', header: 'course.description', type: 'string', sort: true, headerStyle: 'width: 28%' },
    { field: 'repeatInterval', header: 'course.repeatInterval', type: 'option', sort: false, headerStyle: 'width: 19%' },
    { field: 'status', header: 'course.status', type: 'status', sort: true, headerStyle: 'width: 28%' },
  ];

  onEdit(event: any) {
    if (event.type === 'lesson') {
      this.selectedLessonId.set(event.id);
      this.selectedCourseId.set(event.courseId);
      this.showLessonEditDialog.set(true);
    } else {
      this.selectedCourseId.set(event.id);
      this.showCourseEditDialog.set(true);
    }
  }

  onDelete(event: any) {
    this.courseStore.removeCourse(event?.id);
    this.showSuccessMessage('course.messages.deleted');
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
