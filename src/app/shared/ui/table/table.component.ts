import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ConfirmationService, SortMeta } from 'primeng/api';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { ButtonDirective } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { OptionNamePipe } from '@ui/pipes/option.pipe';
import { OptionNamesPipe } from '@ui/pipes/options.pipe';

interface Column {
  field: string;
  header: string;
  type: string;
  sort: boolean;
}

@Component({
  selector: 'sf-table',
  imports: [
    TableModule,
    TranslatePipe,
    DatePipe,
    ButtonDirective,
    ConfirmDialog,
    OptionNamesPipe,
    OptionNamesPipe,
    OptionNamesPipe,
    OptionNamePipe,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() data!: any;
  @Input() columns!: Column[];
  @Input() showButtons: boolean = false;
  @Input() prefix: string = '';

  @Output() rowSelect = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();

  translateService = inject(TranslateService);
  confirmationService = inject(ConfirmationService);
  selectedData: any;
  currentPageReportTemplate = '';

  private currentPageReport = 'shared.table.currentPageReport';
  private searchPlaceholder = 'shared.table.searchPlaceholder';
  emptyMsg = 'shared.table.emptyMessage';

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
      .get([this.prefix + '.delete.title', this.prefix + '.delete.message', this.prefix + '.delete.ok', this.prefix + '.delete.cancel'])
      .subscribe((translations) => {
        this.confirmationService.confirm({
          message: translations[this.prefix + '.delete.message'],
          header: translations[this.prefix + '.delete.title'],
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: translations[this.prefix + '.delete.ok'],
          acceptIcon: 'pi pi-check',
          rejectLabel: translations[this.prefix + '.delete.cancel'],
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
