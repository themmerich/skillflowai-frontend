import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ConfirmationService, SortMeta } from 'primeng/api';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { RoleNamesPipe } from '../pipes/role.pipe';
import { ButtonDirective } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';

interface Column {
  field: string;
  header: string;
  type: string;
  sort: boolean;
}

@Component({
  selector: 'sf-table',
  imports: [TableModule, TranslatePipe, DatePipe, RoleNamesPipe, ButtonDirective, ConfirmDialog],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() emptyMsg: string = 'No items found';
  @Input() searchPlaceholder: string = 'Search keyword';
  @Input() data!: any;
  @Input() columns!: Column[];
  @Input() showButtons: boolean = false;

  @Output() rowSelect = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();

  translateService = inject(TranslateService);
  confirmationService = inject(ConfirmationService);
  selectedData: any;
  currentPageReportTemplate = '';

  private currentPageReport = 'table.currentPageReport';

  loading: boolean = true;
  multiSortMeta: SortMeta[] = [
    {
      field: 'name',
      order: 1,
    },
  ];

  constructor() {
    this.translateService.get(this.currentPageReport).subscribe((translatedText) => {
      this.currentPageReportTemplate = translatedText;
    });

    // Update translation when language changes
    this.translateService.onLangChange.subscribe(() => {
      this.translateService.get(this.currentPageReport).subscribe((translatedText) => {
        this.currentPageReportTemplate = translatedText;
      });
    });
  }

  onRowSelect(event: any) {
    this.selectedData = event.data;
    this.rowSelect.emit(event.data);
  }

  confirmDelete(event: any) {
    this.translateService
      .get(['user.delete.title', 'user.delete.message', 'user.delete.ok', 'user.delete.cancel'])
      .subscribe((translations) => {
        this.confirmationService.confirm({
          message: translations['user.delete.message'],
          header: translations['user.delete.title'],
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: translations['user.delete.ok'],
          acceptIcon: 'pi pi-check',
          rejectLabel: translations['user.delete.cancel'],
          rejectIcon: 'pi pi-times',
          accept: () => this.onDelete(event),
        });
      });
  }

  onDelete(event: any) {
    this.delete.emit(event);
  }

  onEdit(event: any) {
    this.edit.emit(event);
  }
}
